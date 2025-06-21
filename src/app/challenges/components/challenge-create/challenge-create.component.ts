import {Component, Inject, NgModule} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from "@angular/material/form-field";


@Component({
  selector: 'app-challenge-create',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLabel
  ],
  providers: [
    MatDatepickerModule,
  ],
  templateUrl: './challenge-create.component.html',
  standalone: true,
  styleUrl: './challenge-create.component.css'
})
export class ChallengeCreateComponent {
  challengeData = {
    title: '',
    description: '',
    groupId: 0,
    deadline: new Date(),
    imageUrl: '',
  }

  minDate = new Date(); // Fecha mínima (hoy)

  constructor(
      public dialogRef: MatDialogRef<ChallengeCreateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data?.groupId) {
      this.challengeData.groupId = data.groupId;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (
        this.challengeData.title
        && this.challengeData.description
    ) {
      console.log(this.challengeData)
      this.dialogRef.close(this.challengeData);
    }
  }
}
