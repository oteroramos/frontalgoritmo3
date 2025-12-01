import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //private apiUrl = 'http://localhost:8080/api/auth/register';
  private apiUrl = 'https://backalgoritmo.onrender.com/api/auth/register';

  constructor(private http: HttpClient, private router: Router) { }
  
   register(user: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, user);
    }
}
