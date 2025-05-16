import {Component, OnInit} from '@angular/core';
import {Group} from "../../model/group.entity";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatCardModule } from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {User} from "../../../iam/model/user.entity";
import {AuthService} from "../../../iam/services/auth.service";
import {ProfileInGroup} from "../../../iam/model/profile-in-group.entity";

@Component({
  selector: 'app-group-view',
  imports: [
    MatCardModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './group-view.component.html',
  standalone: true,
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit {

  // User
  user: User = new User({});
  userGroupProfile: ProfileInGroup = new ProfileInGroup({})


  group: Group = new Group({});
  isLoading = true;

  constructor(
      private groupService: GroupService,
      private route: ActivatedRoute,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser() || new User({});
    this.loadData();
  }

  private loadData(): void {
    const groupId = this.route.snapshot.paramMap.get('id');

    if (groupId) {
      this.groupService.getById(groupId).subscribe({
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
    console.log(this.userGroupProfile)
  }
}
