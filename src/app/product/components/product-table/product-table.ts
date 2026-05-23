import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { AlertService } from '../../services/alert.service';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-table',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>();
  dialogService = inject(AlertService);
  productService = inject(ProductService);
  deleteProduct = output<string>();
}
