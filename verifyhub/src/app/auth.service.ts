import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface LoggedInUser {
  id: number;
  userId: string;
  name: string;
  role: 'General User' | 'Admin';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: LoggedInUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) {}

  login(
    userId: string,
    password: string,
    role: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        userId,
        password,
        role
      }
    );
  }

  saveUser(
    user: LoggedInUser
  ): void {

    localStorage.setItem(
      'verifyhubUser',
      JSON.stringify(user)
    );
  }

  getUser(): LoggedInUser | null {

    const savedUser =
      localStorage.getItem(
        'verifyhubUser'
      );

    if (!savedUser) {
      return null;
    }

    return JSON.parse(
      savedUser
    );
  }

  logout(): void {

    localStorage.removeItem(
      'verifyhubUser'
    );
  }
}