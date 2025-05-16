import { Component } from '@angular/core';
import {GroupListComponent} from "../../../group/components/group-list/group-list.component";
import {ChallengeListComponent} from "../../../challenges/components/challenge-list/challenge-list.component";

@Component({
  selector: 'app-home',
  imports: [
    GroupListComponent,
    ChallengeListComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
