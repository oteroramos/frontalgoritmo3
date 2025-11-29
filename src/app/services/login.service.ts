import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/auth/login';
  //private apiUrl = 'https://backalgoritmo.onrender.com/api/auth/login';

  private loggedIn = new BehaviorSubject<boolean>(this.hasUser());
  public loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // 🔹 Llamada al backend
  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // 🔹 Guarda usuario en sessionStorage (se borra al cerrar el navegador)
  setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  // 🔹 Recupera usuario
  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Valida si hay usuario logueado
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('user');
  }

  // 🔹 Cierra sesión
  logout(): void {
    sessionStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // 🔹 Método interno para inicializar BehaviorSubject
  private hasUser(): boolean {
    return this.getUser() !== null;
  }
}
