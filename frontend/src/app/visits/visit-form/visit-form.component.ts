import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VisitService } from '../visit.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Toast from 'bootstrap/js/dist/toast';
import { Observable } from 'rxjs'; // Make sure this is imported

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  standalone: true, // ← Check this
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class VisitFormComponent implements OnInit {
  form!: FormGroup;
  visitId!: string | null;
  patientId!: string;

  constructor(
    private route: ActivatedRoute,
    private visitService: VisitService,
    private fb: FormBuilder,
    private router: Router
  ) { }




  ngOnInit(): void {
    this.patientId = this.route.snapshot.queryParamMap.get('patientId') || '';
    this.visitId = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      visitDate: ['', Validators.required],
      visitType: ['', Validators.required],
      notes: ['']
    });

    if (this.visitId) {
      this.visitService.getVisitById(this.visitId!).subscribe((visit) => {
        this.form.patchValue({
          visitDate: visit.visitDate.split('T')[0],
          visitType: visit.visitType,
          notes: visit.notes
        });
        this.patientId = visit.patientId;
      });
    }
  }


  @ViewChild('successToast') successToast!: ElementRef;
  successMessage = '';

  submit(): void {
    if (this.form.invalid || !this.patientId) {
      console.error('Form invalid or patientId missing');
      return;
    }

    const formData = {
      ...this.form.value,
      patientId: this.patientId
    };

    const action$ = this.visitId
      ? this.visitService.updateVisit(this.visitId, formData)
      : this.visitService.createVisit(this.patientId, formData);

    this.successMessage = this.visitId ? 'Visit updated successfully!' : 'Visit added successfully!';

    action$.subscribe(() => {
      // Ensure the DOM is updated first before showing toast
      setTimeout(() => {
        if (this.successToast?.nativeElement) {
          const toast = new Toast(this.successToast.nativeElement);
          toast.show();
        }

        // Delay navigation until after toast is shown
        setTimeout(() => this.router.navigate(['/patients']), 2000);
      }, 0);
    });
  }


}
