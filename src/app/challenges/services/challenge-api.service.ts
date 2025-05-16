import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {Challenge} from "../model/challenge.entity";
import {environment} from "../../../environments/environment";
import {catchError, Observable, retry} from "rxjs";


const challengesResourceEndpoint = environment.challengesEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class ChallengeApiService extends BaseService<Challenge>{

  constructor() {
    super();
    this.resourceEndpoint = challengesResourceEndpoint;
  }

  createChallenge(challenge: Challenge) {
    this.create(challenge);
  }

  getByGroupId(groupId: number): Observable<Array<Challenge>> {
    const url = `${this.resourcePath()}?groupId=${groupId}`;
    return this.http.get<Array<Challenge>>(url, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

}
