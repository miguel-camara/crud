import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

const baseUrl: string = '';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private listProducts = signal<Product[]>([
    {
      id: 'asd',
      description: 'Descripcion 1',
      name: 'Nombre 1',
      price: 123,
      stock: 400,
    },
    {
      id: 'ewq',
      description: 'Descripcion 2',
      name: 'Nombre 2',
      price: 1213,
      stock: 340,
    },
    {
      id: 'dsadad',
      description: 'Descripcion 3',
      name: 'Nombre 3',
      price: 4433,
      stock: 600,
    },
    {
      id: 'yjytd',
      description: 'Descripcion 4',
      name: 'Nombre 4',
      price: 765,
      stock: 470,
    },
  ]);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/products`).pipe(
      // tap(res => this.productsCache.set(key, res)),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  getListProducts(): Observable<Product[]> {
    return of(this.listProducts());
  }

  getProductById(id: string): Observable<Product> {
    // return this.http.get<Product>("");
    // return this.http.get<Product>("");

    if (id === 'new') {
      return of({
        id: 'new',
        description: '',
        name: '',
        price: 0,
        stock: 0,
      });
    }
    const product: Product = this.listProducts().find((p) => p.id === id) ?? {
      description: '',
      name: '',
      price: 0,
      stock: 0,
    };
    return of(product);
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {
    // return this.http.post<Product>(`${baseUrl}/products`, productLike);

    const id: number = Math.floor(Math.random() * 10000);
    const product: Product = {
      ...(productLike as Product),
      id: '' + id,
    };

    this.listProducts.update((products) => [...products, product]);

    return of(product);
  }

  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    // return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike);

    let product: Product;

    const list: Product[] = this.listProducts().map((p) => {
      if (p.id === id) {
        product = { ...(productLike as Product), id: id };
        return product;
      }
      return p;
    });

    this.listProducts.set(list);

    return of(product!);
  }
}
