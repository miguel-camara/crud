import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-table',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>();
}
