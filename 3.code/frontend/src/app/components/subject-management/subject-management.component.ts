// src/app/components/subject-management/subject-management.component.ts
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.css']
})
export class SubjectManagementComponent implements OnInit {
  subjects: any[] = [];
  currentSubject: any = { name: '', code: '' };
  grades: string[] = ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo' ];
  categories: string[] = ['Basica', 'Compleja', 'Media', 'Tecnica'];
  allSubjects: any[] = [];
  searchText: string = '';
  showModal: boolean = false;
  isEditMode: boolean = false;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data.filter((subject: { activo: any; }) => subject.activo);
      this.allSubjects = data.filter((subject: { activo: any; }) => subject.activo);
    });
  }

  showViewModal: boolean = false;

  viewSubject(id: string): void {
    this.subjectService.getSubjectById(id).subscribe(data => {
      this.currentSubject = data;
      this.showViewModal = true;
    }, error => {
      console.error('Error al obtener la materia:', error);
    });
  }

  closeViewModal(): void {
    this.showViewModal = false;
  }

  searchSubject(): void {
    if (this.searchText) {
      this.subjects = this.allSubjects.filter(subject => 
        subject.name.includes(this.searchText) ||
        subject.category.includes(this.searchText) ||
        subject.level.includes(this.searchText) ||
        subject.code.includes(this.searchText) ||
        this.isArray(subject.hours) && subject.hours.includes(this.searchText)
      );
    } else {
      //this.loadSubjects();
      this.subjects = [...this.allSubjects];
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentSubject = { nro: '', name: '', category: '', level: '', code: '', hours: 0 };
    this.showModal = true;
  }

  openEditModal(subject: any): void {
    this.isEditMode = true;
    this.currentSubject = { ...subject };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createSubject(): void {
    this.subjectService.createSubject(this.currentSubject).subscribe(() => {
      this.loadSubjects();
      this.closeModal();
    },

    error => {
      console.error('Error al crear la materia:', error);
    }
    );
  }

  updateSubject(): void {
    this.subjectService.updateSubject(this.currentSubject._id, this.currentSubject).subscribe(() => {
      this.loadSubjects();
      this.closeModal();
    });
  }

  /*deleteSubject(id: string): void {
    this.SubjectService.deleteSubject(id).subscribe(() => {
      this.loadSubjects();
    });
  }*/

    deleteSubject(id: string): void {
      this.subjectService.deactivateSubject(id).subscribe(() => {
        this.loadSubjects();
      }, error => {
        console.error('Error al borrar la materia:', error);
      });
    }

    private isArray(value: any): boolean {
      return Array.isArray(value);
    }
}
