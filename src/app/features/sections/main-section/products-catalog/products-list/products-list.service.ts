import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Product } from '../../../../../core/models/product.entities';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { DataAccessService } from '../../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  urlBase: string;
  httpOptions?: HttpOptions;

  products: WritableSignal<Product[] | null> = signal<Product[] | null>(null);

  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProductos';
  }

  addProduct(product: Product) {
    this.products()?.push(product);
  }

  editProduct(id: number, product: Product) {
    const index: number | undefined = this.products()?.findIndex(p => p.id === id);

    if(index !== undefined && index !== -1) {
      const products: Product[] | null = this.products();
      if(products)
        products[index] = { ...product };
    }
  }

  getProductsFromDatabase(): Observable<Product[]> {
    const products: Product[] | null = this.products();

    if(!products) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
      return this.http.get<Product[]>(this.urlBase, this.httpOptions);
    }
    
    return of(products);
  }

  getProduct(id: number): Product | undefined {
    if(this.products()?.length !== 0) {
      let product: Product | undefined = this.products()?.find(product => product.id === id);
      if(product)
        return product;
      else
        return undefined;
    }
    return undefined;
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlBase, product, this.httpOptions);
  }
}
