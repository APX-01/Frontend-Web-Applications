import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import { DecimalPipe, SlicePipe } from "@angular/common";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-student-analytics',
  templateUrl: './student-analytics.component.html',
  imports: [
    RouterLink,
    BaseChartDirective,
    DecimalPipe,
    SlicePipe
  ],
  styleUrls: ['./student-analytics.component.css']
})
export class StudentAnalyticsComponent implements OnInit {
  studentId!: number;
  groupId!: number;
  studentName!: string;
  submissions: any[] = [];
  isLoading = true;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [{
      data: [],
      label: 'Notas del estudiante',
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.3
    }],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
        title: { display: true, text: 'Nota (Score)' }
      },
      x: {
        title: { display: true, text: 'Tareas' }
      }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor(
      private route: ActivatedRoute,
      private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('studentId')!;
    this.groupId = +this.route.snapshot.paramMap.get('groupId')!;
    this.analyticsService.getStudentName(this.studentId).subscribe({
      next: ({firstName, lastName}) => {
        this.studentName = `${firstName} ${lastName}`.trim() || 'Estudiante';
      },
      error: () => {
        this.studentName = 'Estudiante';
      }
    });

    this.loadStudentScores();
  }

  loadStudentScores() {
    console.log('Cargando scores para estudiante:', this.studentId);

    this.analyticsService.getStudentScores(this.studentId).subscribe({
      next: ({scores, submissions}) => {
        console.log('Datos recibidos:', {scores, submissions});

        if (submissions.length > 0 && submissions[0].studentName) {
          this.studentName = submissions[0].studentName;
        } else if (submissions.length > 0 && submissions[0].user) {
          this.studentName = submissions[0].user.name || 'Estudiante';
        }

        this.submissions = submissions;
        this.lineChartData = {
          datasets: [{
            data: scores,
            label: 'Notas del estudiante',
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3
          }],
          labels: submissions.map((_, i) => `Tarea ${i + 1}`)
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar scores:', err);
        this.isLoading = false;
      }
    });
  }

  calculateAverage(): number {
    if (this.submissions.length === 0) return 0;
    const sum = this.submissions.reduce((acc, curr) => acc + curr.score, 0);
    return sum / this.submissions.length;
  }
}