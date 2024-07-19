import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.css']
})
export class SurveyManagementComponent implements OnInit {
  surveys: any[] = [];
  currentSurvey: any = {};
  showModal: boolean = false;
  isEditMode: boolean = false;
  searchText: string = '';

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe(
      (data) => this.surveys = data,
      (error) => console.error('Error loading surveys:', error)
    );
  }

  searchSurvey(): void {
    if (this.searchText) {
      this.surveys = this.surveys.filter(survey =>
        survey.title.includes(this.searchText) ||
        survey.code.includes(this.searchText)
      );
    } else {
      this.loadSurveys();
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentSurvey = { title: '', code: '', type: '', date: '', status: '', period: '', instructions: '' };
    this.showModal = true;
  }

  openEditModal(survey: any): void {
    this.isEditMode = true;
    this.currentSurvey = { ...survey };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createSurvey(): void {
    const surveyData = {
      title: this.currentSurvey.title,
      code: this.currentSurvey.code,
      type: this.currentSurvey.type, // Debe ser 'Encuesta' o 'Examen'
      date: this.currentSurvey.date,
      status: this.currentSurvey.status, // Debe ser 'Activo' o 'Inactivo'
      period: this.currentSurvey.period,
      instructions: this.currentSurvey.instructions
    };
  
    this.surveyService.createSurvey(surveyData).subscribe(
      () => {
        this.loadSurveys();
        this.closeModal();
      },
      (error) => {
        console.error('Error creating survey:', error);
        alert('Error creating survey: ' + error.error.message);
      }
    );
  }

  updateSurvey(): void {
    this.surveyService.updateSurvey(this.currentSurvey._id, this.currentSurvey).subscribe(
      () => {
        this.loadSurveys();
        this.closeModal();
      },
      (error) => console.error('Error updating survey:', error)
    );
  }

  deleteSurvey(id: string): void {
    this.surveyService.deleteSurvey(id).subscribe(
      () => this.loadSurveys(),
      (error) => console.error('Error deleting survey:', error)
    );
  }

  viewSurvey(id: string): void {
    this.surveyService.getSurvey(id).subscribe(
      (data) => {
        this.currentSurvey = data;
        this.showModal = true;
        this.isEditMode = false; // Set to false if you only want to view details, not edit
      },
      (error) => console.error('Error viewing survey:', error)
    );
  }
}
