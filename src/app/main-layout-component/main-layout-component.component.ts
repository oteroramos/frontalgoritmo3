import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common'; 
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-main-layout-component',
  standalone: true,
  imports: [
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        CommonModule,
        MatExpansionModule
  ],
  templateUrl: './main-layout-component.component.html',
  styleUrl: './main-layout-component.component.css'
})
export class MainLayoutComponentComponent implements OnInit {
    @ViewChild(MatSidenav, { static: true })
    sidenav!: MatSidenav;
  
    isLoggedIn: boolean = false;
  
    constructor(
      private observer: BreakpointObserver,
      private loginService: LoginService,
      private router: Router
    ) {}
  
    cartCount: number = 0;
    count: string | null = null;
    items: any[] = [];  

    ngOnInit(): void {
      // Observar cambios de tamaño para el sidenav
      this.observer.observe(['(max-width: 800px)']).subscribe(res => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
       this.count= localStorage.getItem('cart_items');
       this.items = this.count ? JSON.parse(this.count) : [];

      this.cartCount = this.items.length;
    }
   

    logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
}
}
