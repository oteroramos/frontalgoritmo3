import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips'
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatSidenavModule, 
    MatButtonModule,
    MatIconModule, 
    MatDividerModule, 
    MatListModule, 
    LayoutModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  @ViewChild(MatSidenav, { static: true }) 
   sidenav!: MatSidenav;
  
   constructor(private observer: BreakpointObserver,private router: Router){
  
   }
     ngOnInit(): void {
    this.observer.observe(["(max-width: 800px)"])
    .subscribe((res) => {
      if(res.matches){
        this.sidenav.mode = "over";
        this.sidenav.close();
      }else{
        this.sidenav.mode = "side";
        this.sidenav.open()
      }
    })
  }

  
   goToProductos() {
    this.router.navigate(['/products']);
  }
  
  goToCash(){
    this.router.navigate(['/cash'])
  }


}
