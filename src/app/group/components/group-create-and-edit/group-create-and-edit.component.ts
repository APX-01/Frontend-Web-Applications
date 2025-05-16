import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-group-create-and-edit',
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './group-create-and-edit.component.html',
  standalone: true,
  styleUrl: './group-create-and-edit.component.css'
})
export class GroupCreateAndEditComponent {
  groupData = {
    name: '',
    description: ''
  };

  constructor(
      public dialogRef: MatDialogRef<GroupCreateAndEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.groupData.name && this.groupData.description) {
      this.dialogRef.close(this.groupData);
    }
  }
}
