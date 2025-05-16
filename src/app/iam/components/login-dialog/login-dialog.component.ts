import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-login-dialog',
  imports: [],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string; password: string }) {

  }

}
