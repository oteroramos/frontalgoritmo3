import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
   ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbar,
    RouterModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 constructor(private registerService: RegisterService , private fb: FormBuilder, private router: Router) {}

  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    direccion: [''],
    nacimiento: ['', Validators.required],
    telefono: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', Validators.required]
  }, { validators: this.passwordsIguales });

  passwordsIguales(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const rep = form.get('repeatPassword')?.value;
    return pass === rep ? null : { passwordsNoCoinciden: true };
    
  }

  registrar() {
    if (this.registerForm.invalid) return;
    const user = {
          nombre: this.registerForm.value.nombre,
          apellido: this.registerForm.value.apellido,
          dni: this.registerForm.value.dni,
          direccion: this.registerForm.value.direccion,
          nacimiento: this.registerForm.value.nacimiento,
          telefono: this.registerForm.value.telefono,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          repeatPassword: this.registerForm.value.repeatPassword
    }
    this.registerService.register(user).subscribe()
    console.log("Datos de registro:", this.registerForm.value);
    this.router.navigate(['/login']);
  }
}