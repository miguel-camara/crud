import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductDetail } from './product-detail/product-detail';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'product-admin-page',
  imports: [ProductDetail, Loading],
  templateUrl: './product-admin-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAdminPage {
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  productId = toSignal(this.activedRoute.params.pipe(map((params) => params['id'])));

  productResource = rxResource({
    params: () => ({
      id: this.productId(),
    }),
    stream: ({ params }) => {
      return this.productService.getProductById(params.id);
    },
  });
}
