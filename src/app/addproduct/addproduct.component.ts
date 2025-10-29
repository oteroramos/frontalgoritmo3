import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

  productForm !: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      img: ['',Validators.required]
    });
  }

onSubmit(): void {
  if (this.productForm.valid) {
    this.productService.guardarProducto(this.productForm.value)
      .subscribe({
        next: (prod) => {
          alert('Producto agregado correctamente');
          this.productForm.reset({name:'', price:0, quantity:0,img:''});
        },
        error: (err) => console.error('Error guardando producto', err)
      });
  }
}
}


