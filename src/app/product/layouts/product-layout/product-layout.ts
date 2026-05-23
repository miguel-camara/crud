import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './product-layout.html',
})
export class ProductLayout {}
