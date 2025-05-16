import {Component, Input} from '@angular/core';
import {Group} from "../../model/group.entity";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {ProfileInGroup} from "../../../iam/model/profile-in-group.entity";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-group-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardFooter,
    MatButton,
    RouterLink
  ],
  templateUrl: './group-item.component.html',
  standalone: true,
  styleUrl: './group-item.component.css'
})
export class GroupItemComponent {
  @Input() group: Group = new Group({});
  @Input() groupProfile: ProfileInGroup = new ProfileInGroup({});


}
