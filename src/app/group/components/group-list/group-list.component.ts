import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';

import {Group} from "../../model/group.entity";
import {GroupService} from "../../services/group.service";
import {GroupItemComponent} from "../group-item/group-item.component";
import {MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {GroupJoinCode} from "../../model/group-join-code.entity";
import {GroupJoinCodeService} from "../../services/group-join-code.service";
import {AuthService} from "../../../iam/services/auth.service";
import {ProfileInGroup} from "../../../iam/model/profile-in-group.entity";
import {User} from "../../../iam/model/user.entity";
import {MatDialog} from "@angular/material/dialog";
import {GroupCreateAndEditComponent} from "../group-create-and-edit/group-create-and-edit.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    GroupItemComponent,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatButton,
    MatHint
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit, AfterViewInit {

  @ViewChild('reactiveBox') reactiveBox!: ElementRef;

  loadingGroups: boolean = true;

  user: User = new User({});
  profilesInGroups: ProfileInGroup[] = [];

  joinCodeString: string = '';
  joinCode!: GroupJoinCode;
  joinFailed: boolean = false;

  availableGroups: number[] = [];
  groups: Group[] = [];

  bees = Array.from({ length: 10 }, (_, i) => i); // 10 abejas con índice

  constructor(
      private changeDetector: ChangeDetectorRef,
      private createDialog: MatDialog,
      private groupService: GroupService,
      private groupJoinCodeService: GroupJoinCodeService,
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.user = this.authService.getUser() || new User({});
    this.getUserGroupList();
    this.getAvailableGroups();
  }

  ngAfterViewInit(): void {}

  // 🐝 Estilo aleatorio para cada abeja
  generateBeeStyle(index: number) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 10;
    const delay = Math.random() * 5;
    const size = 16 + Math.random() * 16;

    return {
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`
    };
  }

  private getUserGroupList(): void {
    this.profilesInGroups = this.authService.getUser()?.profilesInGroups || [];
    for (let profile of this.profilesInGroups) {
      this.availableGroups.push(profile.groupId);
    }
  }

  private getAvailableGroups(): void {
    this.groups = [];
    this.availableGroups.map((groupId) => {
      this.groupService.getById(groupId).subscribe({
        next: group => {
          this.groups.push(group);
          this.loadingGroups = false;
        },
        error: err => {
          console.error(`Error al obtener el grupo con ID ${groupId}:`, err);
        }
      });
    });
  }

  submitCode(): void {
    this.joinCode = new GroupJoinCode({});

    this.groupJoinCodeService.getByKey(this.joinCodeString).subscribe({
      next: code => {
        this.joinCode = code;
        this.joinCodeString = '';

        if (this.joinCode && !this.availableGroups.includes(this.joinCode.groupId)) {
          if (this.user.profilesInGroups) {
            this.user.profilesInGroups.push({ groupId: this.joinCode.groupId, score: 0 });
          }
          this.joinCode = new GroupJoinCode({});

          this.authService.update(this.user.id, this.user).subscribe({
            next: (user) => {
              this.authService.setUser(user);
              this.getUserGroupList();
              this.getAvailableGroups();
            }
          });
        } else {
          this.joinFailed = true;
        }
      },
      error: err => {
        console.error(`No existe el código: ${this.joinCodeString}:`, err);
        this.joinFailed = true;
      }
    });
  }

  findGroupById(id: number): Group {
    return this.groups.find(group => group.id === id) || new Group({});
  }

  findGroupProfileById(id: number): ProfileInGroup {
    return this.profilesInGroups.find(profile => profile.groupId === id) || new ProfileInGroup({});
  }

  openCreateGroupDialog(): void {
    const dialogRef = this.createDialog.open(GroupCreateAndEditComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createGroup(result);
      }
    });
  }

  private createGroup(groupData: { name: string, description: string }): void {
    const newGroup = new Group({
      name: groupData.name,
      description: groupData.description,
    });

    this.groupService.create(newGroup).subscribe({
      next: (createdGroup) => {
        this.groups.push(createdGroup);
        this.availableGroups.push(createdGroup.id);

        if (this.user.profilesInGroups) {
          this.user.profilesInGroups.push({ groupId: createdGroup.id, score: 0 });
        }

        this.authService.update(this.user.id, this.user).subscribe({
          next: (user) => {
            this.authService.setUser(user);
            this.getUserGroupList();
            this.getAvailableGroups();
          }
        });
      },
      error: (err) => {
        console.error('Error creating group:', err);
      }
    });
  }
}
