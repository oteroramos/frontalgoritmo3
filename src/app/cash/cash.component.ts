import { Component, OnInit } from '@angular/core';
import { CashService, CashResponse } from '../services/cash.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatDividerModule, CommonModule, DatePipe],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.css'
})
export class CashComponent implements OnInit {
  displayedColumns = ['idCompra', 'product', 'price', 'amount', 'date', 'total'];
  dataSource: CashResponse[] = [];

  constructor(private cashService: CashService) {}

  ngOnInit(): void {
    this.loadCash();
  }

  loadCash(): void {
    this.cashService.getAll().subscribe({
      next: res => (this.dataSource = res),
      error: err => console.error('Error cargando ventas:', err)
    });
  }

  getTotalCaja(): number {
    return this.dataSource.reduce((acc, row) => acc + (row.total || 0), 0);
  }
}
