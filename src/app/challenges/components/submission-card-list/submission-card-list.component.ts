import {Component, Input, OnInit} from '@angular/core';
import {ChallengeCardItemComponent} from "../challenge-card-item/challenge-card-item.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Submission} from "../../model/submission.entity";
import {SubmissionApiService} from "../../services/submission-api.service";
import {SubmissionCardItemComponent} from "../submission-card-item/submission-card-item.component";
import {AuthService} from "../../../iam/services/auth.service";
import {User} from "../../../iam/model/user.entity";

@Component({
  selector: 'app-submission-card-list',
    imports: [
        MatGridList,
        MatGridTile,
        SubmissionCardItemComponent
    ],
  templateUrl: './submission-card-list.component.html',
  styleUrl: './submission-card-list.component.css'
})
export class SubmissionCardListComponent implements OnInit {
    submissions: Submission[] = [];
    user: any;


    @Input() currentChallengeId: number=0;
    @Input() currentUserId: number=0;

    constructor(private submissionService: SubmissionApiService,private authService: AuthService) {
    }

    ngOnInit() {
        this.getAvailableSubmissions()
    }

    private getAvailableSubmissions(): void {
        this.currentUserId = this.authService.getUser()?.id || 0;
        const userRole = this.authService.getUser()?.role || 'student'; // Asume 'student' por defecto
        this.submissions = [];

        this.submissionService.getByChallengeId(this.currentChallengeId).subscribe({
            next: (submissions) => {
                this.submissions = userRole === 'teacher'
                    ? submissions
                    : submissions.filter(submission => submission.studentId === this.currentUserId);
            },
            error: () => this.submissions = []
        });
    }



}
