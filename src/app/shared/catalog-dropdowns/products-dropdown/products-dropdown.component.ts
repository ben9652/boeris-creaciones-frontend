import { Component, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { Product } from '../../../core/models/product.entities';
import { ProductsService } from '../../../core/services/catalogs/products.service';

@Component({
    selector: 'app-products-dropdown',
    imports: [
        DropdownModule,
        FormsModule,
        SkeletonModule
    ],
    templateUrl: './products-dropdown.component.html',
    styleUrl: './products-dropdown.component.scss'
})
export class ProductsDropdownComponent {
  products: Product[] | null = null;
  
  getProduct: OutputEmitterRef<Product> = output<Product>();

  constructor(
    private productsService: ProductsService
  ) {
    productsService.getProductsFromDatabase().subscribe((products: Product[]) => {
      productsService.products.set(products);
      this.products = products;
    })
  }

  onSelection(event: DropdownChangeEvent) {
    this.getProduct.emit(event.value);
  }
}
