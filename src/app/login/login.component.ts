import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { LoginService } from '../services/login.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbar,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user={
    email:'',
    password:''
  };

  loginValid: boolean = true;
  router = inject(Router);

  constructor(private loginService: LoginService) {}

login() {
  this.loginService.login(this.user).subscribe({
    next: (response) => {
      try {
         if (response.email) {
          this.loginService.setUser(response);
          this.router.navigate(['/dashboard']);
        }else {
          this.loginValid = false;
        }
       
      } catch (error) {
        this.loginValid = false;
      }
      
    },
    error: () => {
      this.loginValid = false;
    }
  });
}
}
