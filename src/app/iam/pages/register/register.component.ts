import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['student'],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid){
      alert('Formulario invalido');
      return;
    }

    this.auth.register(this.form.value).subscribe({
      next: () => {
        alert('Registrado con éxito');
        this.form.reset({ role: 'student' });
        this.router.navigate(['/login']);
      },
      error: err => this.error = err.message
    });

  }
}