import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormErrorLabel } from '../../../components/form-error-label/form-error-label';
import { firstValueFrom } from 'rxjs';

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
    stock: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.setFormValue(this.product());
    console.log(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
    };

    this.wasSaved.set(true);

    console.log(productLike);
    console.log(this.product());

    if (this.product().id === 'new') {
      // Crear Product
      const product = await firstValueFrom(this.productsService.createProduct(productLike));
      this.router.navigate(['/product', product.id as string]);
    } else {
      // Actualizar Product
      await firstValueFrom(
        this.productsService.updateProduct(this.product().id as string, productLike),
      );
    }

    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
