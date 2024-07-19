import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  teacherId: string = '';
  period: string = '';
  report: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    // Aquí puedes cargar un informe por defecto o realizar otras inicializaciones
  }

  loadReport(): void {
    this.reportService.getReport(this.teacherId, this.period).subscribe(
      data => {
        this.report = data;
      },
      error => {
        console.error('Error fetching report:', error);
      }
    );
  }
}