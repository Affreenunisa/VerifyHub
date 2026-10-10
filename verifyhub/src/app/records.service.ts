import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecordItem {
  id: string;
  employeeName: string;
  verificationType: string;
  status: string;
  accessLevel: 'General User' | 'Admin';
}

export interface RecordsResponse {
  success: boolean;
  message: string;
  delay: number;
  role: string;
  records: RecordItem[];
}

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRecords(
    role: string,
    delay: number = 0
  ): Observable<RecordsResponse> {

    return this.http.get<RecordsResponse>(
      `${this.apiUrl}/records?role=${encodeURIComponent(role)}&delay=${delay}`
    );

  }
}