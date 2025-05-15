import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {LoginComponent} from './iam/pages/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
