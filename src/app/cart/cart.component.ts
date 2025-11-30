import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CashService } from '../services/cash.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total = 0;
  displayedColumns = ['name', 'price', 'amount', 'subtotal', 'actions'];

  constructor(
    private cartService: CartService,
    private cashService: CashService
  ) {}

  ngOnInit(): void {
    // Cargar carrito desde el storage apenas carga la pantalla
    this.refreshCart();

  }

  private refreshCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.refreshCart();
  }


  clearCart(): void {
    this.cartService.clearCart();
    this.refreshCart();
  }


  abonar(): void {
    if (!this.items.length) return;
    // En lugar de mandar cada producto por separado,
    // generamos una sola venta con todos los productos
    const request = {
      saleItemRequestList: this.items,
      date: new Date(),
      total: this.cartService.getTotal()
    }
    this.cartService.abonar(request).subscribe();
  }
}
