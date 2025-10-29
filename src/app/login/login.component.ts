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
    MatToolbar
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
      this.loginService.setUser(response);
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.loginValid = false;
    }
  });
}
}
