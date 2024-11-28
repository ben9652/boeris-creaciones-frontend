import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../../models/httpOptions.entities';
import { AuthService } from '../auth.service';
import { Product } from '../../models/product.entities';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  urlBase: string;
  httpOptions?: HttpOptions;

  products: WritableSignal<Product[] | null> = signal<Product[] | null>(null);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProductos';
  }

  getProductsFromDatabase(): Observable<Product[]> {
    const products: Product[] | null = this.products();

    if(!products) {
      this.httpOptions = new HttpOptions(this.authService.getToken());
      return this.http.get<Product[]>(this.urlBase, this.httpOptions);
    }
    
    else return of(products);
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
}
