import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {Challenge} from "../../model/challenge.entity";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../iam/services/auth.service";
import {User} from "../../../iam/model/user.entity";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-challenge-card-item',
    imports: [
        MatCardHeader,
        MatCardContent,
        MatCard,
        MatCardFooter,
        RouterLink,
        MatButton,
    ],
  templateUrl: './challenge-card-item.component.html',
  styleUrl: './challenge-card-item.component.css'
})
export class ChallengeCardItemComponent {
  @Input() challenge!: Challenge;

}
