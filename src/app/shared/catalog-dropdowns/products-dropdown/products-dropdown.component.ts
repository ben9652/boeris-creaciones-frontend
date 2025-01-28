import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { Product } from '../../../core/models/product.entities';
import { ProductsService } from '../../../core/services/catalogs/products.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-dropdown',
  imports: [SelectModule, FormsModule, SkeletonModule],
  templateUrl: './products-dropdown.component.html',
  styleUrl: './products-dropdown.component.scss',
  providers: [TranslateService],
})
export class ProductsDropdownComponent {
  products: Product[] | null = null;

  getProduct: OutputEmitterRef<Product> = output<Product>();
  
  disabled: InputSignal<boolean> = input<boolean>(false);

  constructor(
    private productsService: ProductsService,
    public translateService: TranslateService
  ) {
    productsService
      .getProductsFromDatabase()
      .subscribe((products: Product[]) => {
        productsService.products.set(products);
        this.products = products;
      });
  }

  onSelection(event: SelectChangeEvent) {
    this.getProduct.emit(event.value);
  }
}
