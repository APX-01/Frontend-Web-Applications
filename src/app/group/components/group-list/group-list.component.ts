import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {of} from "rxjs";
import {User} from "../../../iam/model/user.entity";
import {MatDialog} from "@angular/material/dialog";
import {GroupCreateAndEditComponent} from "../group-create-and-edit/group-create-and-edit.component";

@Component({
  selector: 'app-group-list',
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
  standalone: true,
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit {

  user: User = new User({});
  profilesInGroups: ProfileInGroup[] = [];

  joinCodeString: string = '';

  joinCode!: GroupJoinCode;
  joinFailed: boolean = false;

  availableGroups:number[]= [];
  groups: Group[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private createDialog: MatDialog, private groupService: GroupService, private groupJoinCodeService: GroupJoinCodeService,private authService: AuthService) { }

  ngOnInit(): void {

    this.user = this.authService.getUser() || new User({});

    this.getUserGroupList()
    this.getAvailableGroups()
  }

  private getUserGroupList(): void {
    this.profilesInGroups = this.authService.getUser()?.profilesInGroups || new Array<ProfileInGroup>()

    for (let profile of this.profilesInGroups) {
      this.availableGroups.push(profile.groupId);
    }
  }

  private getAvailableGroups(): void {
    this.groups = [];
    this.availableGroups.forEach((groupId) => {
      this.groupService.getById(groupId).subscribe({
        next: group => {
          this.groups = [...this.groups, group]; // Crear nuevo array
          this.changeDetector.detectChanges();
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

        if (this.joinCode && !this.availableGroups.includes(this.joinCode.groupId)) {
          this.availableGroups = [...this.availableGroups, this.joinCode.groupId]; // Crear nuevo array

          if (this.user.profilesInGroups) {
            this.user.profilesInGroups = [...this.user.profilesInGroups, { groupId: this.joinCode.groupId, score: 0 }];
          }

          this.authService.update(this.user.id, this.user).subscribe(user => {
            this.user = user;
            this.getAvailableGroups();
            this.changeDetector.detectChanges();
          });
        } else {
          this.joinFailed = true;
        }
      },
      error: err => {
        console.error(`No existe el código: ${this.joinCodeString}:`, err);
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

  private createGroup(groupData: {name: string, description: string}): void {
    const newGroup = new Group({
      name: groupData.name,
      description: groupData.description,
    });

    // Añadir a la lista local
    this.groups.push(newGroup);


    //Publicar al db.json

    this.groupService.create(newGroup).subscribe({
      next: (createdGroup) => {
        this.availableGroups = [...this.availableGroups, createdGroup.id];

        if (this.user.profilesInGroups) {
          this.user.profilesInGroups = [...this.user.profilesInGroups, { groupId: createdGroup.id, score: 0 }];
        }

        this.authService.update(this.user.id, this.user).subscribe(user => {
          this.user = user;
          this.getUserGroupList();
          this.getAvailableGroups();
          this.changeDetector.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error creating group:', err);
      }
    });
  }
}
