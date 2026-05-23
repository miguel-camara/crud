import { Component, inject } from '@angular/core';
import { ProductTable } from '../../components/product-table/product-table';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Loading } from '../../components/loading/loading';
import { AlertService } from '../../services/alert.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-page',
  imports: [ProductTable, RouterLink, Loading],
  templateUrl: './product-page.html',
})
export class ProductPage {
  productService = inject(ProductService);

  dialogService = inject(AlertService);

  productsResource = rxResource({
    stream: () => {
      return this.productService.findAll();
    },
  });

  async delete(id: string) {
    const res: boolean = await this.dialogService.open({
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'error',
      // closeOnBackdrop: false,
      position: 'row',
      showConfirmButton: true,
      showCancelButton: true,
      title: 'Eliminar Producto',
      message: 'Esta accion no se podra desahacer',
    });

    if (!res) return;

    try {
      await firstValueFrom(this.productService.deleteById(id));
      this.dialogService.open({
        type: 'success',
        // closeOnBackdrop: false,
        showConfirmButton: false,
        showCancelButton: false,
        title: 'Elimindo',
        message: 'Eliminado con exito',
        autoClose: true,
        timer: 2000,
      });

      const products = await firstValueFrom(this.productService.findAll());
      this.productsResource.set(products);
    } catch (err) {
      await this.dialogService.open({
        type: 'error',
        // closeOnBackdrop: false,
        showConfirmButton: true,
        confirmText: 'Aceptar',
        title: 'Ocurrio un error',
        message: 'Error al eliminar el producto',
        autoClose: true,
        timer: 2000,
      });
    }
  }
}
