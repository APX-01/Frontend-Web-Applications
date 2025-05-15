import { Component } from '@angular/core';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatAnchor,
    RouterOutlet,
    RouterLink,
    MatSidenavContainer,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatSidenav,
    MatSidenavContent,
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  options = [
    { link: '/home', label: 'Home' },
    { link: '/login', label: 'Login' },
  ]
}
