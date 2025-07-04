import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visit } from './visit.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environtment';

@Injectable({ providedIn: 'root' })
export class VisitService {
    [x: string]: any;
    private api = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    getByPatientId(patientId: string): Observable<Visit[]> {
        return this.http.get<Visit[]>(`${this.api}patients/${patientId}/visits`);
    }

    createVisit(patientId: string, visit: Visit): Observable<Visit> {
        return this.http.post<Visit>(`${this.api}patients/${patientId}/visits`, visit);
    }


    updateVisit(id: string, visit: Partial<Visit>): Observable<Visit> {
        return this.http.put<Visit>(`${this.api}visits/${id}`, visit);
    }

    deleteVisit(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}visits/${id}`);
    }

    getVisitById(id: string): Observable<any> {
        return this.http.get<any>(`${this.api}visits/${id}`);
    }

}
