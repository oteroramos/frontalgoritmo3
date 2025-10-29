import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model'; // Ajustá según tu modelo

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private items: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>([]);

  items$ = this.itemsSubject.asObservable();

  constructor() {}

  // Agregar producto al carrito
  addToCart(product: Product): void {
    const existing = this.items.find(p => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.itemsSubject.next(this.items);
  }

  // Eliminar producto
  removeFromCart(productId: number): void {
    this.items = this.items.filter(p => p.id !== productId);
    this.itemsSubject.next(this.items);
  }

  // Vaciar carrito
  clearCart(): void {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  // Obtener el total
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  // Obtener copia actual
  getItems(): Product[] {
    return [...this.items];
  }
}
