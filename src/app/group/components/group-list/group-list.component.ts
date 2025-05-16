import {Component, OnInit} from '@angular/core';
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
import {ProfilesInGroups} from "../../../iam/model/profiles-in-groups.entity";
import {of} from "rxjs";
import {User} from "../../../iam/model/user.entity";

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

  tempUser: User = new User({});
  tempProfilesInGroups: ProfilesInGroups[] = [];

  joinCodeString: string = '';

  joinCode!: GroupJoinCode;
  joinFailed: boolean = false;

  availableGroups:number[]= [];
  groups: Group[] = [];

  constructor(private groupService: GroupService, private groupJoinCodeService: GroupJoinCodeService,private authService: AuthService) { }

  ngOnInit(): void {

    this.tempUser = this.authService.getUser() || new User({});

    this.getUserGroupList()
    this.getAvailableGroups()
  }

  private getUserGroupList(): void {
    this.tempProfilesInGroups = this.authService.getUser()?.profilesInGroups || new Array<ProfilesInGroups>()

    for (let profile of this.tempProfilesInGroups) {
      this.availableGroups.push(profile.groupId);
    }
  }

  private getAvailableGroups(): void {
    this.groups = []
    this.availableGroups.forEach((groupId) => {
      this.groupService.getById(groupId).subscribe({
        next: group => {
          this.groups.push(group)
        },
        error: err => {
          console.error(`Error al obtener el grupo con ID ${groupId}:`, err);
        }
      })
    })
  }

  submitCode(): void {
    this.joinCode = new GroupJoinCode({});

    this.groupJoinCodeService.getByKey(this.joinCodeString).subscribe({
      next: code => {
        this.joinCode = code;
        console.log(code)

        console.log(`Codigo de grupo asignado al código: ${code.groupId}`)

        if (this.joinCode && !this.availableGroups.includes(this.joinCode.groupId)) {
          this.availableGroups.push(this.joinCode.groupId)
          console.log(this.availableGroups)
          this.getAvailableGroups()

          console.log('Usuario antes de actualizarse', this.tempUser)

          this.tempUser.profilesInGroups?.push({ groupId: this.joinCode.groupId, score: 0})

          console.log('Usuario después de actualizarse', this.tempUser)

          this.authService.update(this.tempUser.id, this.tempUser).subscribe(user => {
            console.log('User actualizado', user)
          })

        } else {
          this.joinFailed = true;
        }

      },
      error: err => {
        console.error(`No existe el código: ${this.joinCodeString}:`, err);
      }
    })
  }

  findGroupProfileById(id: number): ProfilesInGroups {
    return this.tempProfilesInGroups.find(profile => profile.groupId === id) || new ProfilesInGroups({});
  }

  findGroupById(id: number): Group {
    return this.groups.find(group => group.id === id) || new Group({});
  }
}
