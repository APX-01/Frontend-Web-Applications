import { Component } from '@angular/core';
import {GroupListComponent} from "../../../group/components/group-list/group-list.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [
    GroupListComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
