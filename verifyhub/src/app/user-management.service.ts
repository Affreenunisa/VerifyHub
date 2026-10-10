import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserItem {
  id: number;
  userId: string;
  name: string;
  role: 'General User' | 'Admin';
}

export interface UsersResponse {
  success: boolean;
  users: UserItem[];
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  user: UserItem;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) {}

  getUsers(
    role: string
  ): Observable<UsersResponse> {

    return this.http.get<UsersResponse>(
      `${this.apiUrl}/users?role=${encodeURIComponent(role)}`
    );
  }

  createUser(
    adminRole: string,
    userId: string,
    password: string,
    name: string,
    userRole: string
  ): Observable<CreateUserResponse> {

    return this.http.post<CreateUserResponse>(
      `${this.apiUrl}/users`,
      {
        role: adminRole,
        userId,
        password,
        name,
        userRole
      }
    );
  }

  deleteUser(
    adminRole: string,
    userId: number
  ): Observable<DeleteUserResponse> {

    return this.http.delete<DeleteUserResponse>(
      `${this.apiUrl}/users/${userId}?role=${encodeURIComponent(adminRole)}`
    );
  }
}