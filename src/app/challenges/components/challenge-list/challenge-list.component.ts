import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Challenge} from "../../model/challenge.entity";
import {ChallengeApiService} from "../../services/challenge-api.service";
import {ChallengeCardItemComponent} from "../challenge-card-item/challenge-card-item.component";
import {GroupService} from "../../../group/services/group.service";
import {AuthService} from "../../../iam/services/auth.service";
import {ProfilesInGroups} from "../../../iam/model/profiles-in-groups.entity";

@Component({
  selector: 'app-challenge-list',
  imports: [
    MatGridList,
    MatGridTile,
    ChallengeCardItemComponent
  ],
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.css'
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[] = [];
  currentGroupId: number = 1;

  constructor(private challengeService: ChallengeApiService
  ,private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAvailableChallenges()
  }

  private getAvailableChallenges():void{
    this.challenges=[]
    this.challengeService.getByGroupId(this.currentGroupId).subscribe(
        {
            next: (challenges) => {
                this.challenges = challenges;
            },
            error: () => this.challenges = []
        }

    )

  }


}
