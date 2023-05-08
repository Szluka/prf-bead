import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private r: Router) {
    this.http.get<{ message: string, user: User }>('/api/users/auth').subscribe((response) => {
      if (response.message === "Belépve") {
        this.authenticated.next(true);
        this.user.next(response.user);
      } else {
        this.authenticated.next(false);
        this.user.next(null);
        this.r.navigate(['/login']);
      }
    })
  }

  login(username: string, password: string) {
    this.http.post<{ message: string, user: User }>('/api/users/login', { username, password }).subscribe((user) => {
      this.user.next(user.user);
      this.authenticated.next(true);
      this.r.navigate(['/dashboard']);
    });
  }
  register(username: string, password: string) {
    this.http.post<User>('/api/users/register', { username, password }).subscribe((user) => {
      this.user.next(user);
      this.authenticated.next(true);
      this.r.navigate(['/login']);
    });
  }
  logout() {
    this.http.post('/api/users/logout', {}).subscribe(() => {
      this.user.next(null);
      this.authenticated.next(false);
      this.r.navigate(['/login']);
    });
  }
}
