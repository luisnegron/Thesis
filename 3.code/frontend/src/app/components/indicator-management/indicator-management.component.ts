// components/indicator-management/indicator-management.component.ts
import { Component, OnInit } from '@angular/core';
import { IndicatorService } from '../../services/indicator.service';

@Component({
  selector: 'app-indicator-management',
  templateUrl: './indicator-management.component.html',
  styleUrls: ['./indicator-management.component.css']
})
export class IndicatorManagementComponent implements OnInit {
  indicators: any[] = [];
  selectedIndicator: any = { _id: '', name: '', description: '', value: 0 };
  showModal: boolean = false;
  isEditMode: boolean = false;
  searchText: string = '';

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit(): void {
    this.loadIndicators();
  }

  loadIndicators(): void {
    this.indicatorService.getIndicators().subscribe(data => {
      this.indicators = data;
    });
  }

  searchIndicator(): void {
    if (this.searchText) {
      this.indicators = this.indicators.filter(indicator =>
        indicator.name.includes(this.searchText) ||
        indicator.description.includes(this.searchText)
      );
    } else {
      this.loadIndicators();
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.selectedIndicator = { _id: '', name: '', description: '', value: 0 };
    this.showModal = true;
  }

  openEditModal(indicator: any): void {
    this.isEditMode = true;
    this.selectedIndicator = { ...indicator };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createIndicator(): void {
    this.indicatorService.createIndicator(this.selectedIndicator).subscribe(() => {
      this.loadIndicators();
      this.closeModal();
    });
  }

  updateIndicator(): void {
    this.indicatorService.updateIndicator(this.selectedIndicator._id, this.selectedIndicator).subscribe(() => {
      this.loadIndicators();
      this.closeModal();
    });
  }

  deleteIndicator(id: string): void {
    this.indicatorService.deleteIndicator(id).subscribe(() => {
      this.loadIndicators();
    });
  }
}
