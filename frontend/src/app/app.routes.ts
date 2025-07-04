import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'patients',
        loadComponent: () => import('./patients/patient-list/patient-list.component')
            .then(m => m.PatientListComponent)
    },
    {
        path: 'patients/add',
        loadComponent: () => import('./patients/patient-form/patient-form')
            .then(m => m.PatientFormComponent)
    },
    {
        path: 'patients/edit/:id',
        loadComponent: () => import('./patients/patient-form/patient-form')
            .then(m => m.PatientFormComponent)
    },
    {
        path: 'visits/add',
        loadComponent: () => import('./visits/visit-form/visit-form.component')
            .then(m => m.VisitFormComponent)
    },
    {
        path: 'visits/edit/:id',
        loadComponent: () => import('./visits/visit-form/visit-form.component')
            .then(m => m.VisitFormComponent)
    },
    {
        path: 'summary',
        loadComponent: () => import('./summary/summary/summary')
            .then(m => m.SummaryComponent)
    },
    { path: '', redirectTo: 'patients', pathMatch: 'full' }
];
