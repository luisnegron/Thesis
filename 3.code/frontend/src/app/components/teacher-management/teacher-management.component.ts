// src/app/components/teacher-management/teacher-management.component.ts
import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent implements OnInit {
  teachers: any[] = [];
  searchText: string = '';
  allTeachers: any[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentTeacher: any = { name: '', email: '' };

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      
      this.teachers = data.filter((teacher: { activo: any; }) => teacher.activo);
      this.allTeachers = data.filter((subject: { activo: any; }) => subject.activo);
    });
  }

  showViewModal: boolean = false;

  viewTeacher(id: string): void {
    this.teacherService.getTeacherById(id).subscribe(data => {
      this.currentTeacher = data;
      this.showViewModal = true;
    }, error => {
      console.error('Error al obtener profesor:', error);
    });
  }

  closeViewModal(): void {
    this.showViewModal = false;
  }

  searchTeacher(): void {
    if (this.searchText) {
      this.teachers = this.allTeachers.filter(teacher => 
        teacher.name.includes(this.searchText) ||
        teacher.apellido.includes(this.searchText) ||
        teacher.cedula.includes(this.searchText) ||
        teacher.direccion.includes(this.searchText) ||
        teacher.telefono.includes(this.searchText) ||
        teacher.email.includes(this.searchText) ||
        teacher.subject.includes(this.searchText)
      );
    } else {
      //this.loadTeachers();
      this.teachers = [...this.allTeachers];
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentTeacher = { nro: '', cedula: '', name: '', apellido: '', direccion: '', telefono: '', email: '', qualification: '', subject: '' };
    this.showModal = true;
  }

  openEditModal(teacher: any): void {
    this.isEditMode = true;
    this.currentTeacher = { ...teacher };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createTeacher(): void {
    this.teacherService.createTeacher(this.currentTeacher).subscribe(() => {
      this.loadTeachers();
      this.closeModal();
    },

    error => {
      console.error('Error al crear profesor:', error);
    }
    );
  }

  updateTeacher(): void {
    this.teacherService.updateTeacher(this.currentTeacher._id, this.currentTeacher).subscribe(() => {
      this.loadTeachers();
      this.closeModal();
    });
  }

  /*deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }*/

    deleteTeacher(id: string): void {
      this.teacherService.deactivateTeacher(id).subscribe(() => {
        this.loadTeachers();
      }, error => {
        console.error('Error al desactivar estudiante:', error);
      });
    }
}

