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
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {SubmissionApiService} from "../../services/submission-api.service";
import {Submission} from "../../model/submission.entity";

const MAX_ATTEMPTS = 3;
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
    SubmissionCardListComponent,
    NgIf,
    FormsModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './challenge-view.component.html',
  styleUrl: './challenge-view.component.css'
})
export class ChallengeViewComponent implements OnInit {
  challengeToSubmit: Submission = new Submission({});
  challenge:Challenge = new Challenge({});
  isLoading = true;
  tempUser= new User({});
  isSubmissionFormVisible = false;
  //remainingAttempts:number=3;
  remainingAttempts: number = parseInt(localStorage.getItem('remainingAttempts') || '3', 10);


    constructor(
        private challengeService:ChallengeApiService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private submissionService: SubmissionApiService) {
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

  createSubmission(): void {
    const submission :Submission= {
      id: 0,
      challengeId: this.challenge.id,
      studentId: this.tempUser.id,
      content: this.challengeToSubmit.content,
      score: 0,
    };

    this.submissionService.createSubmission(submission).subscribe({
      next: (response) => {
        console.log('Submission creada exitosamente:', response);
        this.isSubmissionFormVisible = false;
      },
      error: (err) => {
        console.error('Error al crear la submission:', err);
      }
    });
    this.remainingAttempts--;
    localStorage.setItem('remainingAttempts', this.remainingAttempts.toString());
  }

  toggleSubmissionForm(): void {
    this.isSubmissionFormVisible = !this.isSubmissionFormVisible;
  }

  resetAttempts(): void {
    this.remainingAttempts = MAX_ATTEMPTS;
    localStorage.setItem('remainingAttempts', this.remainingAttempts.toString());
  }
}
