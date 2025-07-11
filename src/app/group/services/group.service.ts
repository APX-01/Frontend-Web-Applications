import {inject, Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Group} from "../model/group.entity";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthService} from "../../iam/services/auth.service";

const groupsResourceEndpoint = environment.groupsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<Group> {

  constructor(
      private authService: AuthService,
  ) {
    super();
    this.resourceEndpoint = groupsResourceEndpoint;

    if (this.authService.getToken() != null) {
      this.httpOptions.headers = this.httpOptions.headers.append("Authorization", "Bearer " + this.authService.getToken());
    }
  }

  public getGroupsFromUser(userId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.resourcePath()}/user/${userId}`, this.httpOptions);
  }

  public createGroupAsTeacher(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.resourcePath()}`, JSON.stringify(group), this.httpOptions);
  }

  public getGroupsByUserId(userId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.resourcePath()}/user/${userId}`, this.httpOptions);
  }

  

}
