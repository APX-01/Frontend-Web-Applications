import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage} from "@angular/material/card";
import {Challenge} from "../../model/challenge.entity";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../iam/services/auth.service";
import {User} from "../../../iam/model/user.entity";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-challenge-card-item',
    imports: [
        MatCardHeader,
        MatCardContent,
        MatCard,
        MatCardFooter,
        RouterLink,
        MatButton,
        MatCardImage,
        MatIconModule
    ],
    templateUrl: './challenge-card-item.component.html',
    standalone: true,
    styleUrl: './challenge-card-item.component.css'
})
export class ChallengeCardItemComponent implements OnInit {
  @Input() challenge!: Challenge;

  groupId!: number;

  constructor(
      private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
      this.groupId = this.route.snapshot.params['groupId'];
  }
}
