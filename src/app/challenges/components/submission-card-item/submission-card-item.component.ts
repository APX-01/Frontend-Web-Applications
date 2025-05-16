import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Submission} from "../../model/submission.entity";

@Component({
  selector: 'app-submission-card-item',
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader
    ],
  templateUrl: './submission-card-item.component.html',
  styleUrl: './submission-card-item.component.css'
})
export class SubmissionCardItemComponent {
 @Input() submission!: Submission;
}
