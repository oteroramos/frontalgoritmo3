import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CashRequest {
  idCompra?: number;
  product: string;
  price: number;
  amount: number;
  date: Date;
  total: number;
}

export interface CashResponse extends CashRequest {}

@Injectable({
  providedIn: 'root'
})
export class CashService {
  //esto es para cambiar el host (la nube/desployado)
  //private apiUrl = 'http://localhost:8080/api/cash';
  private apiUrl = 'https://backalgoritmo.onrender.com/api/cash';

  constructor(private http: HttpClient) {}

  saveCompra(req: CashRequest): Observable<CashResponse> {
    return this.http.post<CashResponse>(`${this.apiUrl}/buy`, req);
  }

  getAll(): Observable<CashResponse[]> {
    return this.http.get<CashResponse[]>(`${this.apiUrl}/all`);
  }
}