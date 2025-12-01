import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

import { MatGridListModule } from '@angular/material/grid-list';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
  MatCardModule, 
  MatChipsModule, 
  MatProgressBarModule,
  MatGridListModule,
  MatButtonModule,
  CommonModule,
  MatIcon,
  FormsModule,],
templateUrl: './products.component.html', 
styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
products: Product[] = [];

  constructor(private ProductService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
    this.ProductService.getProducts().subscribe({
      next: (data: Product[]) => this.products = data,
      error: (err: any) => console.error('Error cargando productos:', err)
    });
  }

  incrementar(p: Product) {
    if (!p.quantity) p.quantity = 0; // valor inicial
    if (p.quantity < p.stock) {
      p.quantity++;
    }
  }

  decrementar(p: Product) {
    if (p.quantity > 0) {
      p.quantity--;
    }
  }

  comprar(producto: Product) {
    if (!producto.quantity || producto.quantity <= 0) {
      console.warn('Debe seleccionar una cantidad válida.');
      return;
    }

    // 👇 Esto lo activa para el carrito
    this.cartService.addToCart(producto);
    console.log(`${producto.name} agregado al carrito`);
  }

}
