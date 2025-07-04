export interface Visit {
    _id?: string;
    visitDate: string;
    visitType: 'Home' | 'Clinic' | 'Telehealth';
    notes?: string;
    createdAt?: string;
    patientId: string;
    visitId?: string | null; // optional and nullable
}
