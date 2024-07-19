import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result-management',
  templateUrl: './result-management.component.html',
  styleUrls: ['./result-management.component.css']
})
export class ResultManagementComponent implements OnInit {
  period: string = '';
  result: any;

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    // Aquí puedes cargar los resultados por defecto o realizar otras inicializaciones
  }

  loadResults(): void {
    this.resultService.getResults(this.period).subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.error('Error fetching results:', error);
      }
    );
  }
}
