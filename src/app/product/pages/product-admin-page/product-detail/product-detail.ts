import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormErrorLabel } from '../../../components/form-error-label/form-error-label';
import { firstValueFrom } from 'rxjs';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'product-detail',
  imports: [ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  product = input.required<Product>();

  router = inject(Router);
  fb = inject(FormBuilder);

  productsService = inject(ProductService);
  wasSaved = signal(false);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
  });

  private alert = inject(AlertService);

  ngOnInit(): void {
    this.setFormValue(this.product());
    console.log(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(formLike as any);
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
    };

    if (this.wasSaved()) return;

    this.wasSaved.set(true);

    if (this.product().id === 'new') {
      // Crear Product
      try {
        const product = await firstValueFrom(this.productsService.create(productLike));
        this.router.navigate(['/product', product.id]);
        await this.alert.open({
          title: 'Producto Creado',
          message: 'Se creo el producto con Exito',
          type: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          autoClose: true,
          timer: 2000,
        });
      } catch (error) {
        await this.alert.open({
          title: 'Ocurrio un Error',
          message: 'Error al crear el producto',
          type: 'error',
          autoClose: true,
          timer: 2000,
          confirmText: 'Aceptar',
          showCancelButton: false,
          showConfirmButton: true,
        });
      }
    } else {
      // Actualizar Product
      try {
        const product = await firstValueFrom(
          this.productsService.update(productLike, this.product().id!),
        );

        await this.alert.open({
          title: 'Producto Actualizado',
          message: 'Se actualizo el producto con Exito',
          type: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          autoClose: true,
          timer: 2000,
        });
      } catch (error) {
        await this.alert.open({
          title: 'Ocurrio un Error',
          message: 'Error al actualizar el producto',
          type: 'error',
          autoClose: true,
          timer: 2000,
          confirmText: 'Aceptar',
          showCancelButton: false,
          showConfirmButton: true,
        });
      }
    }

    setTimeout(() => {
      this.wasSaved.set(false);
    }, 1000);
  }
}
