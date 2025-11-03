import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true, // ✅ indica que es un componente standalone
//imports: [UpperCasePipe], // ✅ agregás el pipe a los imports
})
export class ProfileComponent {
  @Input() nombre: string = 'María';
  @Input() apellido: string = 'Pérez';
  @Input() edad: number = 28;

  get iniciales(): string {
    const n = this.nombre ? this.nombre.charAt(0) : '';
    const a = this.apellido ? this.apellido.charAt(0) : '';
    return (n + a).toUpperCase();
  }
}

