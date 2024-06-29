// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        // Redirige según el rol del usuario
        if (response.user.role === 'administrator') {
          this.router.navigate(['/dashboard']);
        } else if (response.user.role === 'student') {
          this.router.navigate(['/student-home']);
        } else if (response.user.role === 'teacher') {
          this.router.navigate(['/teacher-home']);
        }
      },
      error => {
        console.error('Error during login', error);
        this.handleError(error);
      }
    );
  }

  handleError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
    } else {
      this.errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
    }
  }
}