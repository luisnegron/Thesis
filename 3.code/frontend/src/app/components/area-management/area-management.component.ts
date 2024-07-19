// area-management.component.ts
import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service'; // Asegúrate de tener este servicio
import { TeacherService } from 'src/app/services/teacher.service'; // Si es necesario

@Component({
  selector: 'app-area-management',
  templateUrl: './area-management.component.html',
  styleUrls: ['./area-management.component.css']
})
export class AreaManagementComponent implements OnInit {
  areas: any[] = [];
  teachers: any[] = [];
  selectedArea: any = { id: '', name: '', description: '' };
  showModal: boolean = false;
  showViewModal: boolean = false;
  isEditMode: boolean = false;
  searchText: string = '';

  constructor(
    private areaService: AreaService,
    private teacherService: TeacherService // Incluir si necesitas manejar profesores
  ) {}

  ngOnInit(): void {
    this.loadAreas();
    this.loadTeachers();
  }

  loadAreas(): void {
    this.areaService.getAreas().subscribe(data => {
      this.areas = data;
    });
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  searchArea(): void {
    if (this.searchText) {
      this.areas = this.areas.filter(area =>
        area.name.includes(this.searchText) ||
        area.description.includes(this.searchText)
      );
    } else {
      this.loadAreas();
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.selectedArea = { id: '', name: '', description: '' };
    this.showModal = true;
  }

  openEditModal(area: any): void {
    this.isEditMode = true;
    this.selectedArea = { ...area };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createArea(): void {
    this.areaService.createArea(this.selectedArea).subscribe(() => {
      this.loadAreas();
      this.closeModal();
    });
  }

  updateArea(): void {
    this.areaService.updateArea(this.selectedArea.id, this.selectedArea).subscribe(() => {
      this.loadAreas();
      this.closeModal();
    });
  }

  deleteArea(id: string): void {
    this.areaService.deleteArea(id).subscribe(() => {
      this.loadAreas();
    });
  }

  viewArea(id: string): void {
    // Implementa la lógica para mostrar el detalle de un área si es necesario
    console.log('Implementa la lógica para ver el detalle del área aquí');
  }

  closeViewModal(): void {
    this.showViewModal = false;
  }

  // Aquí puedes agregar métodos adicionales según necesites, como manejo de profesores u otras funcionalidades
}

