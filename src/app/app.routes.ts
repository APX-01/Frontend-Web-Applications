import { Routes } from '@angular/router';

import { HomeComponent } from './public/pages/home/home.component';
import { LoginComponent } from './iam/pages/login/login.component';
import { RegisterComponent } from './iam/pages/register/register.component'; // 👈 importa tu componente de registro

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // 👈 nueva ruta para registro
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // opcional: ruta para manejar rutas no válidas
];
