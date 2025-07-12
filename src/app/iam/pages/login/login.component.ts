import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() registerEvent = new EventEmitter<boolean>();

  loginForm: FormGroup;

  loginError: boolean = false;
  errorMessage: string = "";

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid){
      alert('Formulario invalido');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        window.location.reload();
        alert(`Bienvenido, ${user.firstName}`);
        localStorage.setItem('auth_token', user.token);
        localStorage.setItem('auth_user', JSON.stringify(user));
      },
      error: err => {
        this.loginError = true;
        if (err.status === 401) {
          this.errorMessage = "Usuario o contraseña inválidos";
        }
      }
    });
  }

  switchToRegister() {
    this.registerEvent.emit(false);
  }

  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}