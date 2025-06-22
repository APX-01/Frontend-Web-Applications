import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { AuthService } from '../../services/auth.service'; // Asegúrate de que esta ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  private imageOptions: string[] = [
    'https://randomuser.me/api/portraits/men/15.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg',
    'https://randomuser.me/api/portraits/men/33.jpg',
    'https://randomuser.me/api/portraits/women/10.jpg',
    'https://randomuser.me/api/portraits/women/18.jpg',
    'https://randomuser.me/api/portraits/women/35.jpg'
  ];

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // <- aquí usamos tu método existente

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = {
      ...user,
      imageUrl: this.getRandomImage()
    };

    console.log("Perfil cargado:", this.user);
  }

  getRandomImage(): string {
    const index = Math.floor(Math.random() * this.imageOptions.length);
    return this.imageOptions[index];
  }

  edit() {
    console.log("Edit profile clicked");
  }
}
