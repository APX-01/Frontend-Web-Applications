import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatAnchor} from '@angular/material/button';
import {SidebarComponent} from './public/components/sidebar/sidebar.component';
import {User} from "./iam/model/user.entity";
import {AuthService} from "./iam/services/auth.service";

@Component({
  selector: 'app-root',
  imports: [SidebarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'EduHive-FrontEnd';
  //currentUser: any = null; // Aquí almacenarás los datos del usuario

  constructor(private authService: AuthService) {
    console.log(localStorage.getItem('auth_user'),'AppComponent cargado');
  }

  ngOnInit(): void {

  }

}
