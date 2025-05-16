import {Component, OnInit} from '@angular/core';
import {ChallengeListComponent} from "../../components/challenge-list/challenge-list.component";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Challenge} from "../../model/challenge.entity";
import {ChallengeApiService} from "../../services/challenge-api.service";
import {SubmissionCardListComponent} from "../../components/submission-card-list/submission-card-list.component";
import {AuthService} from "../../../iam/services/auth.service";
import {User} from "../../../iam/model/user.entity";

@Component({
  selector: 'app-challenge-view',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink,
    SubmissionCardListComponent
  ],
  templateUrl: './challenge-view.component.html',
  styleUrl: './challenge-view.component.css'
})
export class ChallengeViewComponent implements OnInit {
  challenge:Challenge = new Challenge({});
  isLoading = true;
  tempUser= new User({});

    constructor(
        private challengeService:ChallengeApiService,
        private route: ActivatedRoute,
        private authService: AuthService) {
    }

    ngOnInit(): void {
      this.tempUser=this.authService.getUser()|| new User({});
      this.loadData();
    }
  loadData(): void {
    const challengeId = this.route.snapshot.paramMap.get('id');

    if (challengeId) {
      this.challengeService.getById(challengeId).subscribe({
        next: (challenge) => {
          this.challenge = challenge;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading challenge:', err);
          this.isLoading = false;
        }
      });
    }


  }



}
