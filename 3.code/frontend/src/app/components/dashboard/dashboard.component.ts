// src/app/components/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  modules = [
    //{ name: 'Gestión de Usuarios', route: '/users' },
    { name: 'Gestión de Estudiantes', route: '/students' },
    { name: 'Gestión de Profesores', route: '/teachers' },
    { name: 'Gestión de Materias', route: '/subjects' },
    { name: 'Gestión de Paralelos', route: '/parallels' },
    { name: 'Gestión de Áreas', route: '/areas' },
    { name: 'Gestión de Indicadores', route: '/indicators' },
    { name: 'Gestión de Preguntas', route: '/questions' },
    { name: 'Gestión de Encuestas', route: '/surveys' },
    { name: 'Encuestas', route: '/surveys-responses' },
    { name: 'Evaluaciones', route: '/evaluations' },
    { name: 'Gestión de Informes', route: '/reports' },
    { name: 'Gestión de Resultados', route: '/results' }
  ];

  currentModule: string = 'Estudiantes';

  constructor(private router: Router) { }

  setCurrentModule(moduleName: string): void {
    this.currentModule = moduleName;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}