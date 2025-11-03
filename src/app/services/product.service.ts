import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
    //private apiUrl = 'http://localhost:8080/api/products/';
    private apiUrl = 'https://backalgoritmo.onrender.com/api/products/';
    
  private products: Product[] = [];
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  guardarProducto(formValue: any): Observable<Product> {
    const payload = {
      name: formValue.name,
      price: formValue.price,
      stock: formValue.quantity, // mapear quantity → stock
      img: formValue.img
    };
    return this.http.post<Product>(this.apiUrl + 'save', payload);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.products$.next([...this.products]); // actualiza el observable
  }
}
