import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private apiUrl = 'http://localhost:8080/api/auth/login';
  private apiUrl = 'https://backalgoritmo.onrender.com/api/auth/login';

  private loggedIn = new BehaviorSubject<boolean>(this.hasUser());
  public loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('user');
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private hasUser(): boolean {
    return this.getUser() !== null;
  }
}
