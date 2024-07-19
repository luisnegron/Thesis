import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { Evaluation } from 'src/app/models/evaluation';

@Component({
  selector: 'app-evaluation-management',
  templateUrl: './evaluation-management.component.html',
  styleUrls: ['./evaluation-management.component.css']
})
export class EvaluationManagementComponent implements OnInit {
  evaluations: Evaluation[] = [];
  period: string = '';
  searchText: string = '';

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit(): void {
    // Puedes establecer un período por defecto o obtenerlo de alguna parte
  }

  loadEvaluations(): void {
    this.evaluationService.getEvaluationsByPeriod(this.period).subscribe(data => {
      this.evaluations = data;
    });
  }

  searchEvaluations(): void {
    if (this.searchText) {
      this.evaluations = this.evaluations.filter(evaluation =>
        evaluation.surveyId.title.includes(this.searchText) ||
        evaluation.results.some((result) => result.studentId.name.includes(this.searchText))
      );
    } else {
      this.loadEvaluations();
    }
  }
}