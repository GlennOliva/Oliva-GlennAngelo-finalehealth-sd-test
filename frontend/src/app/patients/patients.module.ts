import { NgModule } from '@angular/core';
import { PatientFormComponent } from './patient-form/patient-form';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
    imports: [PatientFormComponent, PatientListComponent], // ✅ Correct for standalone
    exports: [PatientFormComponent, PatientListComponent], // Optional
})
export class PatientsModule { }
