/*import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {
  sections: any[] = [];
  teachers: any[] = [];
  subjects: any[] = [];
  allSections: any[] = [];
  periods: string[] = ['2023-2024', '2024-2025', '2025-2026', '2026-2027', '2027-2028', '2028-2029', '2029-2030'];
  currentSection: any = { nro: '', teacher: '', subject: '', period: '', code: '', name: '' };
  searchText: string = '';
  showModal: boolean = false;
  showAddStudentModal: boolean = false;
  showStudentsModal: boolean = false;
  isEditMode: boolean = false;
  showViewModal: boolean = false;
  students: any[] = [];
  allStudents: any[] = [];
  selectedStudentId: string = '';
  selectedStudents: string[] = [];
  showAddStudentsModal: boolean = false;

  constructor(private sectionService: SectionService, private teacherService: TeacherService, private subjectService: SubjectService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadSections();
    this.loadTeachers();
    this.loadSubjects();
    this.loadStudents();
    //this.loadAllStudents();
  }

  loadSections(): void {
    this.sectionService.getSections().subscribe(data => {
      this.sections = data.filter((section: { active: boolean; }) => section.active);
      this.allSections = data.filter((section: { active: boolean; }) => section.active);
    });
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data.filter((teacher: { activo: any; }) => teacher.activo);
    });
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data.filter((subject: { activo: any; }) => subject.activo);
    });
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data.filter((student: { active: any; }) => student.active);
    });
  }

  /*loadAllStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.allStudents = data.filter((student: { active: any; }) => student.active);
    });
  }

  /*viewSection(id: string): void {
    this.sectionService.getSectionById(id).subscribe(data => {
      this.currentSection = data;
      this.showViewModal = true;
    }, error => {
      console.error('Error fetching section:', error);
    });
  }*/

  /*viewSection(id: string): void {
    this.sectionService.getSectionById(id).subscribe(data => {
      this.currentSection = data;
      const subject = this.subjects.find(sub => sub._id === this.currentSection.subject);
      this.currentSection.subjectName = subject ? subject.name : 'N/A';
      this.showViewModal = true;
    });
  }

  viewSectionStudents(id: string): void {
    this.sectionService.getSectionStudents(id).subscribe(data => {
      this.students = data;
      this.showStudentsModal = true;
    });
  }

  openAddStudentsModal(section: any): void {
    this.currentSection = section;
    this.selectedStudents = [];
    this.showAddStudentsModal = true;
  }

  addStudentsToSection(): void {
    this.sectionService.addStudentsToSection(this.currentSection._id, this.selectedStudents).subscribe(() => {
      this.loadSections();
      this.closeStudentsModal();
    });
  }

  /*loadStudents(sectionId: string): void {
    this.sectionService.getStudentsBySection(sectionId).subscribe(data => {
      this.students = data;
    }, error => {
      console.error('Error fetching students:', error);
    });
  }

  openAddStudentModal(sectionId: string): void {
    this.currentSection._id = sectionId;
    this.showAddStudentModal = true;
  }

  closeAddStudentModal(): void {
    this.showAddStudentModal = false;
  }

  addStudentToSection(): void {
    this.sectionService.addStudentToSection(this.currentSection._id, this.selectedStudentId).subscribe(() => {
      this.loadSections();
      this.closeAddStudentModal();
    }, error => {
      console.error('Error adding student to section:', error);
    });
  }*/
  /*closeViewModal(): void {
    this.showViewModal = false;
  }

  closeStudentsModal(): void {
    this.showStudentsModal = false;
  }

  closeAddStudentsModal(): void {
    this.showAddStudentsModal = false;
  }

  searchSection(): void {
    if (this.searchText) {
      this.sections = this.allSections.filter(section => 
        section.name.includes(this.searchText) ||
        section.teacher.name.includes(this.searchText) ||
        section.subject.name.includes(this.searchText) ||
        section.period.includes(this.searchText) ||
        section.code.includes(this.searchText) 
      );
    } else {
      this.sections = [...this.allSections];
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentSection = { teacher: '', subject: '', period: '', code: '', name: '' };
    this.showModal = true;
  }

  openEditModal(section: any): void {
    this.isEditMode = true;
    this.currentSection = { ...section };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createSection(): void {
    this.sectionService.createSection(this.currentSection).subscribe(() => {
      this.loadSections();
      this.closeModal();
    }, error => {
      console.error('Error creating section:', error);
    });
  }

  updateSection(): void {
    this.sectionService.updateSection(this.currentSection._id, this.currentSection).subscribe(() => {
      this.loadSections();
      this.closeModal();
    }, error => {
      console.error('Error updating section:', error);
    });
  }

  deleteSection(id: string): void {
    this.sectionService.deactivateSection(id).subscribe(() => {
      this.loadSections();
    }, error => {
      console.error('Error deactivating section:', error);
    });
  }
}*/

import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {
  sections: any[] = [];
  teachers: any[] = [];
  subjects: any[] = [];
  students: any[] = [];
  selectedStudents: string[] = [];
  periods: string[] = ['2023-2024', '2024-2025', '2025-2026'];
  searchText: string = '';
  showModal: boolean = false;
  showViewModal: boolean = false;
  showStudentsModal: boolean = false;
  showAddStudentsModal: boolean = false;
  isEditMode: boolean = false;
  currentSection: any = { nro: '', teacher: '', subject: '', period: '', code: '', name: '', category: '' };

  constructor(
    private sectionService: SectionService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadSections();
    this.loadTeachers();
    this.loadSubjects();
    this.loadStudents();
  }

  loadSections(): void {
    this.sectionService.getSections().subscribe(data => {
      this.sections = data.filter((section: { active: any; }) => section.active);
    });
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data.filter((teacher: { activo: any; }) => teacher.activo);
    });
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data.filter((subject: { activo: any; }) => subject.activo);
    });
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data.filter((student: { activo: any; }) => student.activo);
    });
  }

  searchSection(): void {
    if (this.searchText) {
      this.sections = this.sections.filter(section => 
        section.name.includes(this.searchText) ||
        section.teacher.name.includes(this.searchText) ||
        section.subject.name.includes(this.searchText) ||
        section.period.includes(this.searchText) ||
        section.code.includes(this.searchText)
      );
    } else {
      this.loadSections();
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentSection = { nro: '', teacher: '', subject: '', period: '', code: '', name: '', category: '' };
    this.showModal = true;
  }

  openEditModal(section: any): void {
    this.isEditMode = true;
    this.currentSection = { ...section };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createSection(): void {
    this.sectionService.createSection(this.currentSection).subscribe(() => {
      this.loadSections();
      this.closeModal();
    });
  }

  updateSection(): void {
    this.sectionService.updateSection(this.currentSection._id, this.currentSection).subscribe(() => {
      this.loadSections();
      this.closeModal();
    });
  }

  deleteSection(id: string): void {
    this.sectionService.deactivateSection(id).subscribe(() => {
      this.loadSections();
    });
  }

  viewSection(id: string): void {
    this.sectionService.getSectionById(id).subscribe(data => {
      this.currentSection = data;
      const subject = this.subjects.find(sub => sub._id === this.currentSection.subject);
      this.currentSection.subjectName = subject ? subject.name : 'N/A';
      this.showViewModal = true;
    });
  }

  viewSectionStudents(id: string): void {
    this.sectionService.getSectionStudents(id).subscribe(data => {
      this.students = data;
      this.showStudentsModal = true;
    });
  }

  openAddStudentsModal(section: any): void {
    this.currentSection = section;
    this.selectedStudents = [];
    this.loadStudents(); // Cargar estudiantes aquí
    this.showAddStudentsModal = true;
  }

  /*addStudentsToSection(): void {
    this.sectionService.addStudentsToSection(this.currentSection._id, this.selectedStudents).subscribe(() => {
      this.loadSections();
      this.viewSectionStudents(this.currentSection._id);
      this.closeAddStudentsModal();
    });
  }*/

    addStudentsToSection(): void {
      const sectionId = this.currentSection._id;
      const selectedStudentIds = this.selectedStudents;
  
      this.sectionService.getSectionStudents(sectionId).subscribe((existingStudents: Student[]) => {
        const existingStudentIds = existingStudents.map(student => student._id);
        const duplicates = selectedStudentIds.filter(id => existingStudentIds.includes(id));
  
        if (duplicates.length > 0) {
          alert(`Los estudiantes con ID ${duplicates.join(', ')} ya están en esta sección.`);
          return;
        }
  
        this.sectionService.addStudentsToSection(sectionId, selectedStudentIds).subscribe(() => {
          this.viewSectionStudents(sectionId); // Recargar estudiantes después de agregar
          this.closeAddStudentsModal();
        });
      });
    }

  closeViewModal(): void {
    this.showViewModal = false;
  }

  closeStudentsModal(): void {
    this.showStudentsModal = false;
  }

  closeAddStudentsModal(): void {
    this.showAddStudentsModal = false;
  }
}