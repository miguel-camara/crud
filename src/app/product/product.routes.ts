import { Routes } from '@angular/router';
import { ProductLayout } from './layouts/product-layout/product-layout';
import { ProductPage } from './pages/product-page/product-page';
import { ProductAdminPage } from './pages/product-admin-page/product-admin-page';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductLayout,
    children: [
      {
        path: 'products',
        component: ProductPage,
        title: 'Productos',
      },
      {
        path: 'product/:id',
        component: ProductAdminPage,
        title: 'Administrar Productos',
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default productRoutes;
