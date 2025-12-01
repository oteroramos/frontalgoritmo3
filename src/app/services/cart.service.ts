import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    //private apiUrl = 'http://localhost:8080/api/sale';
    private apiUrl = 'https://backalgoritmo.onrender.com/api/sale';

  private storageKey = 'cart_items';
  private items: Product[] = [];

  constructor(private http: HttpClient) {
    this.items = this.loadFromStorage();
  }

 
  private loadFromStorage(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }


  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }


  addToCart(product: Product): void {
    const existing = this.items.find(p => p.id === product.id);
    if (existing) {
      console.log('Producto ya en el carrito, aumentando cantidad ', existing);
      existing.quantity! += 1;

    } else {
      this.items.push({ ...product, quantity: 1 });
    }
   
    console.log('Carrito actual:', this.items); 
    this.saveToStorage();
  }


  removeFromCart(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
  }

 
  clearCart(): void {
    this.items = [];
    this.saveToStorage();
  }

  getTotal(): number {
   let total = 0;

  for (let item of this.items) {
    const quantity = item.quantity || 0;  // por si es undefined
    total += item.price * quantity;
  }

  return total;
  }


  getItems(): Product[] {
    return [...this.items];
  }

  abonar(request: any){
    return this.http.post(this.apiUrl + '/save',request)
  }
}
