import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Challenge} from "../../model/challenge.entity";

@Component({
  selector: 'app-challenge-card-item',
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCard
  ],
  templateUrl: './challenge-card-item.component.html',
  styleUrl: './challenge-card-item.component.css'
})
export class ChallengeCardItemComponent {
  @Input() challenge!: Challenge;
}
