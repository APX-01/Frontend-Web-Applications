import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: any = {
    name: "Josue Flores",
    email: "456@upc.edu.pe",
    role: "student",
    password: "456",
    id: 2,
    imageUrl: "https://static.dw.com/image/16440430_804.jpg"
  }

  ngOnInit(): void {
    // Fetch user data from a service or API
    // For now, we are using a static object
    console.log("Profile component initialized with user data:", this.user);
  }

  edit() {
    // Logic to edit the profile
    console.log("Edit profile clicked");
  }
}
