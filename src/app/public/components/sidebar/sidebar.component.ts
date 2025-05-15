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
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";

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
        LanguageSwitcherComponent,
    ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  options = [
    { link: '/home', label: 'Home' },
    { link: '/login', label: 'Login' },
    { link: '/register', label: 'Register' },
  ]
}
