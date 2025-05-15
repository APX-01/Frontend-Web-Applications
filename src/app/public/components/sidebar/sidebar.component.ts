import { Component } from '@angular/core';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatAnchor,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    RouterLinkActive,
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
