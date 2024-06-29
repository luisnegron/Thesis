// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    if (this.name && this.email && this.password && this.role) {
      this.authService.register(this.name, this.email, this.password, this.role).subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error during registration', error);
          this.handleError(error);
        }
      );
    } else {
      this.errorMessage = 'Por favor complete todos los campos.';
    }
  }

  handleError(error: any): void {
    if (error.status === 400) {
      this.errorMessage = 'El correo electrónico ya está en uso.';
    } else {
      this.errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
    }
  }
}