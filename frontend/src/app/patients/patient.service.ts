import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from './patient.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environtment';


@Injectable({ providedIn: 'root' })
export class PatientService {
    private api = `${environment.apiUrl}patients`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.api);
    }

    getById(id: string): Observable<Patient> {
        return this.http.get<Patient>(`${this.api}/${id}`); // ✅ CORRECT
    }




    create(data: Patient): Observable<Patient> {
        return this.http.post<Patient>(this.api, data);
    }

    update(id: string, data: Patient): Observable<Patient> {
        return this.http.put<Patient>(`${this.api}/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }
    getSummary(): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/summary`);
    }




}
