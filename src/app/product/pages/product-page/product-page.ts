import { Component, inject } from '@angular/core';
import { ProductTable } from '../../components/product-table/product-table';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Loading } from '../../components/loading/loading';
import { DialogService } from '../../services/dialog.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AlertService } from '../../services/alert.service';

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
  private snack = inject(SnackbarService);
  private alert = inject(AlertService);

  showSuccess() {
    this.snack.open('Usuario guardado correctamente', 'success');
  }
  showInfo() {
    this.snack.open('Informacion de usuario', 'info');
  }
  showError() {
    this.snack.open('Ocurrio un error', 'error');
  }
  showWarning() {
    this.snack.open('Advertencia en el componente', 'warning');
  }
  async showAlertError() {
    await this.alert.open({
      title: 'Eliminar usuario',
      message: 'Esta acción no se puede deshacer',
      type: 'error',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      position: 'row',
      showCancelButton: true,
    });
  }

  showAlertSuccess() {
    this.alert.open({
      title: 'Guardado',
      message: 'El usuario fue agregado correctamente',
      type: 'success',
      autoClose: true,
      timer: 2000,
      showConfirmButton: true,
    });
  }
  async showAlertInfo() {
    await this.alert.open({
      title: 'Eliminar usuario',

      message: 'Esta acción no se puede deshacer',

      type: 'info',

      confirmText: 'Sí, eliminar',

      cancelText: 'Cancelar',

      showCancelButton: true,
    });
  }
  async showAlertQuestion() {
    await this.alert.open({
      title: 'Eliminar usuario',

      message: 'Esta acción no se puede deshacer',

      type: 'question',

      confirmText: 'Sí, eliminar',

      cancelText: 'Cancelar',

      showCancelButton: true,
    });
  }

  async showAlertWarning() {
    await this.alert.open({
      title: 'Eliminar usuario',

      message: 'Esta acción no se puede deshacer',

      type: 'warning',

      confirmText: 'Sí, eliminar',

      cancelText: 'Cancelar',

      showCancelButton: true,
    });
  }

  test() {
    console.log('Metodo de prueba');
    setTimeout(() => {
      console.log('Funciono?');
      this.deleteItem();
    }, 500);
  }

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
