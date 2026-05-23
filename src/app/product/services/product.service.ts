import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

const baseUrl: string = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, Product[]>();

  findAll(): Observable<Product[]> {
    if (this.productsCache.has('products')) return of(this.productsCache.get('products')!);

    return this.http.get<Product[]>(baseUrl).pipe(
      tap((res) => this.productsCache.set('products', res)),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  findById(id: string): Observable<Product> {
    if (id === 'new') {
      return of({
        id: 'new',
        description: '',
        name: '',
        price: 0,
      });
    }

    return this.http.get<Product>(`${baseUrl}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  create(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}`, product).pipe(
      tap((res) => {
        const ps = this.productsCache.get('products')!;
        ps.push({
          ...res,
        });

        this.productsCache.set('products', ps);
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  update(product: Partial<Product>, id: string): Observable<Product> {
    return this.http.put<Product>(`${baseUrl}/${id}`, product).pipe(
      tap((res) => this.updateCache(res, true)),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  deleteById(id: string): Observable<Product> {
    return this.http.delete<Product>(`${baseUrl}/${id}`).pipe(
      tap((res) => this.updateCache(res, false)),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  updateCache(product: Product, isUpdate: boolean): void {
    if (!isUpdate) {
      const listProducts = this.productsCache
        .get('products')!
        .filter((res) => res.id !== product.id);
      this.productsCache.set('products', listProducts);

      return;
    }

    const listProducts = this.productsCache.get('products')!.map((res) => {
      if (res.id === product.id) {
        res = product;
      }
      return res;
    });
    this.productsCache.set('products', listProducts);
  }
}
