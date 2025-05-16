import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {Challenge} from "../../model/challenge.entity";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-challenge-card-item',
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardFooter,
    MatButton,
    RouterLink
  ],
  templateUrl: './challenge-card-item.component.html',
  styleUrl: './challenge-card-item.component.css'
})
export class ChallengeCardItemComponent {
  @Input() challenge!: Challenge;
}
