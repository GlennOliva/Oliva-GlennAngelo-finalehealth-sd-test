import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientService } from '../patient.service';
import { CommonModule } from '@angular/common';
import Toast from 'bootstrap/js/dist/toast';
import { Observable } from 'rxjs'; // Make sure this is imported

declare var bootstrap: any;

@Component({
  selector: 'app-patient-form',
  standalone: true, // ← Check this
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './patient-form.html'
})

export class PatientFormComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      dob: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Continue to check for `id` for edit:
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.patientService.getById(this.id!).subscribe({
        next: (patient) => this.form.patchValue(patient),
        error: (err) => console.error('Error loading patient', err)
      });
    }
  }


  @ViewChild('successToast') successToast!: ElementRef;
  successMessage = '';

  submit(): void {
    if (this.form.invalid) return;

    let action$: Observable<any>;

    if (this.id && this.form.value.action === 'delete') {
      action$ = this.patientService.delete(this.id);
      this.successMessage = 'Patient deleted successfully!';
    } else if (this.id) {
      action$ = this.patientService.update(this.id, this.form.value);
      this.successMessage = 'Patient updated successfully!';
    } else {
      action$ = this.patientService.create(this.form.value);
      this.successMessage = 'Patient added successfully!';
    }

    action$.subscribe(() => {
      const toast = new Toast(this.successToast.nativeElement);
      toast.show();

      setTimeout(() => this.router.navigate(['/patients']), 2000);
    });
  }

}
