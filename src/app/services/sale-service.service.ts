import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashResponse } from './cash.service';

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {
  //private baseUrl = 'https://backalgoritmos.onrender.com/api/sale';
  private baseUrl = 'https://backalgoritmo.onrender.com/api/sale';


  constructor(private http: HttpClient) {}

  saveCompra(sale: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, sale);
  }

  getAllSales(): Observable<CashResponse[]> {
    return this.http.get<CashResponse[]>(`${this.baseUrl}/all`);
  }
}
