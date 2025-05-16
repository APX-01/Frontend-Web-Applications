import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BaseService} from "../../shared/services/base.service";
import {GroupJoinCode} from "../model/group-join-code.entity";
import {catchError, map, Observable, retry} from "rxjs";

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
    return this.http.get<GroupJoinCode[]>(`${this.resourcePath()}?key=${key}`, this.httpOptions)
        .pipe(
            retry(2),
            map((codes: GroupJoinCode[]) => {
              const foundCode = codes.find(code => code.key === key);
              if (!foundCode) {
                throw new Error('Code not found');
              }
              return foundCode;
            }),
            catchError(this.handleError)
        );
  }

    public getByGroupId(groupId: number): Observable<GroupJoinCode> {
        return this.http.get<GroupJoinCode[]>(`${this.resourcePath()}?groupId=${groupId}`, this.httpOptions)
            .pipe(
                retry(2),
                map((codes: GroupJoinCode[]) => {
                    const foundCode = codes.find(code => code.groupId === groupId);
                    if (!foundCode) {
                        throw new Error('Code not found');
                    }
                    return foundCode;
                }),
                catchError(this.handleError)
            );
    }

  public deleteByGroupId(groupId: number): Observable<any> {
      return this.http.delete<any>(`${this.resourcePath()}?groupId=${groupId}`, this.httpOptions)
          .pipe( retry(2), catchError(this.handleError));
  }
}
