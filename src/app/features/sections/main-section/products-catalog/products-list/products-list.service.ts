import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Product } from '../../../../../core/models/product.entities';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  urlBase: string;
  httpOptions?: HttpOptions;

  products: WritableSignal<Product[]> = signal<Product[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProductos';
  }

  addProduct(product: Product) {
    this.products().push(product);
  }

  getProductsFromDatabase(): Observable<Product[]> {
    if(this.products.length === 0) {
      this.httpOptions = new HttpOptions(this.authService.getToken());
      return this.http.get<Product[]>(this.urlBase, this.httpOptions);
    }

    return of(this.products());
  }

  getProduct(id: number): Product | undefined {
    if(this.products.length !== 0) {
      let product: Product | undefined = this.products().find(product => product.id === id);
      if(product) {
        return product;
      }
      else {
        return undefined;
      }
    }
    return undefined;
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlBase, product, this.httpOptions);
  }
}
