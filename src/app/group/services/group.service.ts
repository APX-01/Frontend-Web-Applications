import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {Group} from "../model/group.entity";
import {environment} from "../../../environments/environment";

const groupsResourceEndpoint = environment.groupsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<Group> {

  constructor() {
    super();
    this.resourceEndpoint = groupsResourceEndpoint;
  }
}
