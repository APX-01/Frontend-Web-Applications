import { Component, Input, OnInit } from '@angular/core';
import {
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardImage
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // 👈 Importa MatIconModule
import { NgIf } from '@angular/common';
import { Submission } from '../../model/submission.entity';
import { AuthService } from '../../../iam/services/auth.service';
import { User } from '../../../iam/model/user.entity';
import { MatDialog } from '@angular/material/dialog';
import { SubmissionEditComponent } from '../submission-edit/submission-edit.component';

@Component({
    selector: 'app-submission-card-item',
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardFooter,
        MatCardImage,
        MatButton,
        MatIconModule, // ✅ Aquí lo agregas
        NgIf
    ],
    templateUrl: './submission-card-item.component.html',
    styleUrl: './submission-card-item.component.css'
})
export class SubmissionCardItemComponent implements OnInit {
    @Input() submission!: Submission;
    currentUser: User = new User({});

    constructor(private authService: AuthService, private dialog: MatDialog) {}

    ngOnInit() {
        this.currentUser = this.authService.getUser() || new User({});
    }

    editSubmission(): void {
        const dialogRef = this.dialog.open(SubmissionEditComponent, {
            width: '400px',
            data: { ...this.submission }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Datos editados:', result);
            }
        });
    }
}
