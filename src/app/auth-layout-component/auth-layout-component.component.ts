import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth-layout-component',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './auth-layout-component.component.html',
  styleUrl: './auth-layout-component.component.css'
})
export class AuthLayoutComponentComponent {

}
