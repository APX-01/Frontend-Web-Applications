import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-no-access-page',
  imports: [
    MatButton,
    RouterLink,
    MatIcon
  ],
  templateUrl: './no-access-page.component.html',
  standalone: true,
  styleUrl: './no-access-page.component.css'
})
export class NoAccessPageComponent {

}
