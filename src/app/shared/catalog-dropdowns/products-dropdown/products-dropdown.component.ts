import { Component, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { Product } from '../../../core/models/product.entities';
import { ProductsService } from '../../../core/services/catalogs/products.service';

@Component({
    selector: 'app-products-dropdown',
    imports: [
        SelectModule,
        FormsModule,
        SkeletonModule
    ],
    templateUrl: './products-dropdown.component.html',
    styleUrl: './products-dropdown.component.scss'
})
export class ProductsDropdownComponent {
  products: Product[] | null = null;
  
  getProduct: OutputEmitterRef<Product> = output<Product>();
translateService: any;

  constructor(
    private productsService: ProductsService
  ) {
    productsService.getProductsFromDatabase().subscribe((products: Product[]) => {
      productsService.products.set(products);
      this.products = products;
    })
  }

  onSelection(event: SelectChangeEvent) {
    this.getProduct.emit(event.value);
  }
}
