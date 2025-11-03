import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @Input() nombre: string = 'E-COMMERCE ALIMENTOS';
  @Input() descripcion: string = 'Somos un e-commerce de alimentos que conecta productores locales y marcas de confianza con consumidores que buscan calidad, practicidad y sabor.';
  @Input() valores: string[] = [
    'Frescura y calidad',
    'Apoyo a productores locales',
    'Envío rápido y seguro'
  ];
  @Input() direccionImagen: string = '';

  get iniciales(): string {
    if (!this.nombre) return '';
    return this.nombre
      .split(' ')
      .map(p => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}
