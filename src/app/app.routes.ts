import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {LoginComponent} from './iam/pages/login/login.component';
import {RegisterComponent} from "./iam/pages/register/register.component";
import {GroupListComponent} from "./group/components/group-list/group-list.component";
import {GroupViewComponent} from "./group/pages/group-view/group-view.component";
import {ChallengeViewComponent} from "./challenges/pages/challenge-view/challenge-view.component";
import {GroupMembersViewComponent} from "./group/pages/group-members-view/group-members-view.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'group/:id', component: GroupViewComponent },
  { path: 'group/members/:id', component: GroupMembersViewComponent },
  { path: 'challenge/:id', component: ChallengeViewComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
