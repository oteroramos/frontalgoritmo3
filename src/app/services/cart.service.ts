import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart_items';
  private items: Product[] = [];

  constructor() {
    this.items = this.loadFromStorage();
  }

  /** 🔹 Cargar carrito desde localStorage */
  private loadFromStorage(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  /** 🔹 Guardar carrito */
  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  /** 🛒 Agregar producto */
  addToCart(product: Product): void {
    const existing = this.items.find(p => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
   
    console.log('Carrito actual:', this.items); 
    this.saveToStorage();
  }

  /** ❌ Eliminar producto */
  removeFromCart(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
  }

  /** 🧹 Vaciar carrito */
  clearCart(): void {
    this.items = [];
    this.saveToStorage();
  }

  /** 💰 Total */
  getTotal(): number {
   let total = 0;

  for (let item of this.items) {
    const amount = item.amount || 0;  // por si es undefined
    total += item.price * amount;
  }

  return total;
  }

  /** 📦 Obtener items */
  getItems(): Product[] {
    return [...this.items];
  }
}
