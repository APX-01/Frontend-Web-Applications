import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, switchMap, map } from 'rxjs';
import { User } from '../models/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
            map(users => {
                if (users.length !== 1) throw new Error('Credenciales inválidas');
                localStorage.setItem('auth_token', 'fake-token');
                localStorage.setItem('auth_user', JSON.stringify(users[0]));
                return users[0];
            })
        );
    }

    register(user: User): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
            switchMap(res => res.length ? throwError(() => new Error('Ya registrado')) : this.http.post<User>(this.apiUrl, user))
        );
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    logout(): void {
        localStorage.clear();
    }

    getUser(): User | null {
        return JSON.parse(localStorage.getItem('auth_user') || 'null');
    }
}
