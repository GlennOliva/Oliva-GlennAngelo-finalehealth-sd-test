import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patients/patient.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html',
  standalone: true, // ← Check this
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SummaryComponent implements OnInit {
  summaries: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getSummary().subscribe({
      next: (data) => {
        console.log('SUMMARY DATA:', data);
        this.summaries = data;
      },
      error: (err) => {
        console.error('Failed to load summary:', err);
      }
    });
  }



  get totalPages(): number {
    return Math.ceil(this.summaries.length / this.itemsPerPage);
  }

  paginatedSummaries(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.summaries.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }


}



