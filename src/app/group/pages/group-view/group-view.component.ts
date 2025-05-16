import {Component, OnInit} from '@angular/core';
import {Group} from "../../model/group.entity";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatCardModule } from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {User} from "../../../iam/model/user.entity";
import {AuthService} from "../../../iam/services/auth.service";
import {ProfileInGroup} from "../../../iam/model/profile-in-group.entity";
import {ChallengeListComponent} from "../../../challenges/components/challenge-list/challenge-list.component";
import {GroupJoinCodeService} from "../../services/group-join-code.service";


@Component({
  selector: 'app-group-view',
  imports: [
    MatCardModule,
    MatButton,
    RouterLink,
    ChallengeListComponent,

  ],
  templateUrl: './group-view.component.html',
  standalone: true,
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit {

  // User
  user: User = new User({});
  userGroupProfile: ProfileInGroup = new ProfileInGroup({})

  groupId!: number;

  group: Group = new Group({});
  isLoading = true;

  constructor(
      private groupService: GroupService,
      private route: ActivatedRoute,
      private authService: AuthService,
      private joinCodeService: GroupJoinCodeService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser() || new User({});
    this.loadData();
  }

  private loadData(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));

    if (this.groupId) {
      this.groupService.getById(this.groupId).subscribe({
        next: (group) => {
          this.group = group;
          this.isLoading = false;
          this.loadUserProfile();
        },
        error: (err) => {
          console.error('Error loading group:', err);
          this.isLoading = false;
        }
      });
    }
  }

  private loadUserProfile(): void {
    console.log('Grupo: ', this.group)

    this.userGroupProfile = this.user.profilesInGroups?.find(profile => profile.groupId === this.group.id) || new ProfileInGroup({});
    console.log('User Group Profile: ', this.userGroupProfile)
  }

  leaveGroup(): void {
    console.log('User antes de salir: ', this.user)
    this.user.profilesInGroups = this.user.profilesInGroups?.filter(profile => profile.groupId != this.group.id)
    console.log('User después de salir: ', this.user)
    this.authService.setUser(this.user)

    this.authService.update(this.user.id, this.authService.getUser() || new User({})).subscribe({})
  }

  deleteGroup(): void {

    let studentList: User[] = []

    this.leaveGroup()

    this.authService.getUsersByGroupId(this.group.id).subscribe({
      next: (users) => {

        studentList = users;
        studentList.forEach(user => {
          user.profilesInGroups = user.profilesInGroups?.filter(profile => profile.groupId != this.group.id)
          this.authService.update(user.id, user).subscribe({})
        })

        this.joinCodeService.deleteByGroupId(this.group.id).subscribe({})
        this.groupService.delete(this.group.id).subscribe({})
      }
    })
  }
}
