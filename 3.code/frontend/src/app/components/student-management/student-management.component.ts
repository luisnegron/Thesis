// src/app/components/student-management/student-management.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students: any[] = [];
  searchText: string = '';
  allStudents: any[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentStudent: any = { name: '', email: '' };
  grades: string[] = ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo' ];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      //this.students = data;
      this.students = data.filter((student: { activo: any; }) => student.activo);
      this.allStudents = data.filter((subject: { activo: any; }) => subject.activo);
    });
  }

  showViewModal: boolean = false;

  viewStudent(id: string): void {
    this.studentService.getStudentById(id).subscribe(data => {
      this.currentStudent = data;
      this.showViewModal = true;
    }, error => {
      console.error('Error al obtener estudiante:', error);
    });
  }

  closeViewModal(): void {
    this.showViewModal = false;
  }

  searchStudent(): void {
    if (this.searchText) {
      this.students = this.allStudents.filter(student => 
        student.name.includes(this.searchText) ||
        student.apellido.includes(this.searchText) ||
        student.cedula.includes(this.searchText) ||
        student.direccion.includes(this.searchText) ||
        student.telefono.includes(this.searchText) ||
        student.email.includes(this.searchText) ||
        student.email.includes(this.searchText)
      );
    } else {
      //this.loadStudents();
      this.students = [...this.allStudents];
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentStudent = { nro: '', cedula: '', name: '', apellido: '', direccion: '', telefono: '', email: '', grado: '' };
    this.showModal = true;
  }

  openEditModal(student: any): void {
    this.isEditMode = true;
    this.currentStudent = { ...student };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createStudent(): void {
    this.studentService.createStudent(this.currentStudent).subscribe(() => {
      this.loadStudents();
      this.closeModal();
    },

    error => {
      console.error('Error al crear estudiante:', error);
    }
    );
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.currentStudent._id, this.currentStudent).subscribe(() => {
      this.loadStudents();
      this.closeModal();
    });
  }

  /*deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }*/

    deleteStudent(id: string): void {
      this.studentService.deactivateStudent(id).subscribe(() => {
        this.loadStudents();
      }, error => {
        console.error('Error al desactivar estudiante:', error);
      });
    }
}
