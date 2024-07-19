// src/app/components/teacher-management/teacher-management.component.ts
import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent implements OnInit {
  teachers: any[] = [];
  subjects: any[] = [];
  searchText: string = '';
  allTeachers: any[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentTeacher: any = { name: '', email: '', subject: '' };

  constructor(private teacherService: TeacherService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadSubjects();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      
      this.teachers = data.filter((teacher: { activo: any; }) => teacher.activo);
      this.allTeachers = data.filter((subject: { activo: any; }) => subject.activo);
    });
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data.filter((subject: { activo: any; }) => subject.activo);
    }, error => {
      console.error('Error loading subjects:', error);
    });
  }

  showViewModal: boolean = false;

  viewTeacher(id: string): void {
    this.teacherService.getTeacherById(id).subscribe(data => {
      this.currentTeacher = data;
      const subject = this.subjects.find(sub => sub._id === this.currentTeacher.subject);
      this.currentTeacher.subjectName = subject ? subject.name : 'N/A';
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

