import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BaseService} from "../../shared/base.service";
import {GroupJoinCode} from "../model/group-join-code.entity";
import {catchError, Observable, retry} from "rxjs";

const groupJoinCodesResourceEndpoint = environment.groupJoinCodesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class GroupJoinCodeService extends BaseService<GroupJoinCode> {

  constructor() {
    super();
    this.resourceEndpoint = groupJoinCodesResourceEndpoint;
  }

  public getByKey(key: string): Observable<GroupJoinCode> {
    return this.http.get<GroupJoinCode>(`${this.resourcePath()}?key=${key}`, this.httpOptions)
        .pipe( retry(2), catchError(this.handleError));
  }
}
