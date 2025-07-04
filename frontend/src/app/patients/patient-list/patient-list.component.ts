import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VisitListComponent } from '../../visits/visit-list/visit-list.component';

@Component({
  standalone: true,
  selector: 'app-patient-list',
  imports: [CommonModule, FormsModule, RouterModule, VisitListComponent],
  templateUrl: './patient-list.html'
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  currentPage = 1;
  pageSize = 5;
  search = '';

  constructor(private patientService: PatientService) { }
  selectedPatientId: string | null = null;


  onSearchChange(): void {
    this.currentPage = 1;
  }


  showVisits(patientId: string): void {
    this.selectedPatientId = this.selectedPatientId === patientId ? null : patientId;
  }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe(data => {
      this.patients = data;
    });
  }


  get filteredPatients() {
    if (!this.search.trim()) return this.patients;
    const lower = this.search.toLowerCase();
    return this.patients.filter(p =>
      (p.firstName + ' ' + p.lastName).toLowerCase().includes(lower) ||
      p.email.toLowerCase().includes(lower)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.pageSize);
  }

  get paginatedPatients() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPatients.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }


  delete(id: string) {
    if (confirm('Delete this patient?')) {
      this.patientService.delete(id).subscribe(() => this.loadPatients());
    }
  }
}
