import { Component, Input, OnInit } from '@angular/core';
import { Visit } from '../visit.model';
import { VisitService } from '../visit.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  standalone: true, // ← Check this
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class VisitListComponent implements OnInit {
  @Input() patientId!: string;
  visits: Visit[] = [];

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    if (this.patientId) {
      this.loadVisits();
    }
  }

  loadVisits() {
    this.visitService.getByPatientId(this.patientId).subscribe(data => {
      this.visits = data.sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime());
    });
  }

  deleteVisit(id: string) {
    if (confirm('Delete this visit?')) {
      this.visitService.deleteVisit(id).subscribe(() => this.loadVisits());
    }
  }
}
