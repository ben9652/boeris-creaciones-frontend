import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { areProductsEqual, createNullProduct, createProductRow, Product, ProductRow } from '../../../../../core/models/product.entities';
import { ProductsCatalogService } from '../products-catalog.service';
import { ProductsListService } from './products-list.service';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-products-list',
    imports: [
        TableModule,
        ButtonModule,
        TranslateModule,
        SkeletonModule
    ],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.scss',
    providers: [TranslateService]
})
export class ProductsListComponent {
  productsMap: Map<number, ProductRow> = new Map<number, ProductRow>();

  constructor(
    public productsCatalogService: ProductsCatalogService,
    public productsListService: ProductsListService,
    private deviceTypeService: DeviceTypeService,
    private router: Router,
    public translateService: TranslateService
  ) {
    effect(() => {
      const selectedProduct: Product | null = productsCatalogService.selectedProduct();
      if(selectedProduct !== null) {
        let actualProduct: ProductRow | undefined = this.productsMap.get(selectedProduct.id);

        // Si no es indefinido el producto significa que seleccionamos un producto de la lista
        if(actualProduct !== undefined) {
          actualProduct.modified = selectedProduct;

          // Si el producto sufrió una modificación en la base de datos
          if(!productsCatalogService.nonModified && productsCatalogService.productUpdated) {
            actualProduct.nonModified = selectedProduct;
            actualProduct.modified = selectedProduct;
            productsCatalogService.productUpdated = false;
            productsCatalogService.nonModified = true;
          }
          else {
            
          }
        }
        
        // Si es indefinido, significa que no se encuentra en la lista
        else {
          // Si su ID es mayor a 0, significa que agregamos el producto
          if(selectedProduct.id !== 0) {
            this.productsMap.set(selectedProduct.id, createProductRow(selectedProduct, selectedProduct));
          }
        }
      }

      // Si se apretó el botón de cancelar, es decir, si el producto seleccionado es nulo
      else if(productsCatalogService.selectedNonModifiedProduct) {
        const id: number = productsCatalogService.selectedNonModifiedProduct.id;
        
        let productRowNoAffected: ProductRow | undefined = this.productsMap.get(id);
        if(productRowNoAffected) {
          const nonModifiedProduct: Product = productRowNoAffected.nonModified;
          productRowNoAffected.modified = nonModifiedProduct;
          productsCatalogService.selectedNonModifiedProduct = null;
          productsCatalogService.nonModified = true;
        }
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productsListService.getProductsFromDatabase().subscribe((response: Product[]) => {
      this.productsListService.products.set(response);
      response.forEach((product: Product) => {
        this.productsMap.set(product.id, createProductRow(product, product));
      })
    })
  }

  getProductsList(): ProductRow[] {
    const productRows: ProductRow[] = Array.from(this.productsMap.values());
    return productRows;
  }

  youAreAdding(): boolean {
    return this.productsCatalogService.selectedProduct()?.id === 0;
  }

  clickOnAddNewProduct() {
    this.productsCatalogService.selectedProduct.set(createNullProduct());
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['product-addition']);
    }
  }

  clickOnProduct(product: ProductRow) {
    this.productsCatalogService.selectedNonModifiedProduct = product.nonModified;
    this.productsCatalogService.selectedProduct.set(product.modified);
    this.productsCatalogService.nonModified = areProductsEqual(product.nonModified, product.modified);
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['product-edition']);
    }
  }
}
