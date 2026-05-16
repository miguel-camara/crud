import { Component, inject } from '@angular/core';
import { ProductTable } from '../../components/product-table/product-table';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Loading } from '../../components/loading/loading';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'product-page',
  imports: [ProductTable, RouterLink, Loading],
  templateUrl: './product-page.html',
})
export class ProductPage {
  productService = inject(ProductService);

  productsResource = rxResource({
    params: () => ({}),
    stream: () => {
      return this.productService.getListProducts();
    },
  });
  private dialog = inject(DialogService);

  async deleteItem() {
    const confirmed = await this.dialog.confirm(
      'Eliminar elemento!!!',
      'Esta acción no se puede deshacer!!!',
    );

    if (confirmed) {
      console.log('Eliminar');
      return;
    }

    console.log('Cancelado');
  }
}
