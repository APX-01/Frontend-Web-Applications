import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {LoginComponent} from './iam/pages/login/login.component';
import {RegisterComponent} from "./iam/pages/register/register.component";
import {GroupListComponent} from "./group/components/group-list/group-list.component";
import {GroupViewComponent} from "./group/pages/group-view/group-view.component";
import {ChallengeViewComponent} from "./challenges/pages/challenge-view/challenge-view.component";
import {GroupMembersViewComponent} from "./group/pages/group-members-view/group-members-view.component";
import {NoAccessPageComponent} from "./public/pages/no-access-page/no-access-page.component";
import { StudentAnalyticsComponent } from './analytics/components/student-analytics/student-analytics.component';

export const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'group/:groupId', component: GroupViewComponent },
  { path: 'group/:groupId/members', component: GroupMembersViewComponent },
  { path: 'group/:groupId/challenge/:challengeId', component: ChallengeViewComponent },
  { path: 'group/:groupId/student/:studentId/analytics', component: StudentAnalyticsComponent },
  { path: 'no-access', component: NoAccessPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
