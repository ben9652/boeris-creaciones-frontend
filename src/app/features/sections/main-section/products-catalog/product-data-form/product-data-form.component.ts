import { Component, effect } from '@angular/core';
import { ImageManagerComponent } from './image-manager/image-manager.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { createNullProduct, Product } from '../../../../../core/models/product.entities';
import { ProductsCatalogService } from '../products-catalog.service';
import { ProductsListService } from '../products-list/products-list.service';
import { MessageService } from 'primeng/api';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-data-form',
  standalone: true,
  imports: [
    ImageManagerComponent,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './product-data-form.component.html',
  styleUrl: './product-data-form.component.scss',
  providers: [MessageService, TranslateService]
})
export class ProductDataFormComponent {
  loading: boolean = false;

  constructor(
    public productsCatalogService: ProductsCatalogService,
    public productsListService: ProductsListService,
    private messageService: MessageService,
    private deviceTypeService: DeviceTypeService,
    private location: Location,
    public translateService: TranslateService
  ) {
    
  }

  updateProductName(value: string) {
    this.productsCatalogService.updateSelectedProduct('name', value);
    this.productsCatalogService.addPatchObject('replace', 'name', value);
  }

  updateProductPrice(value: number) {
    this.productsCatalogService.updateSelectedProduct('price', value);
    this.productsCatalogService.addPatchObject('replace', 'price', value);
  }

  updateProductPicture(value: File) {
    const pictureString: string = URL.createObjectURL(value);
    this.productsCatalogService.updateSelectedProduct('picture', pictureString);
    this.productsCatalogService.addPatchObject('replace', 'picture', pictureString);
  }

  updateProductComment(value: string) {
    let comment: string | null;
    if(value.length === 0) {
      comment = null;
    }
    else {
      comment = value;
    }
    this.productsCatalogService.updateSelectedProduct('comment', comment);
    this.productsCatalogService.addPatchObject('replace', 'comment', comment);
  }

  getPicture(): string | null {
    const product: Product | null = this.productsCatalogService.selectedProduct();
    return product ? product.picture : null;
  }

  clickOnCancel() {
    if(this.deviceTypeService.isMobile()) {
      this.location.back();
    }
    this.productsCatalogService.selectedProduct.set(null);
    this.productsCatalogService.patchData.splice(0);
  }

  clickOnConfirm() {
    this.loading = true;

    // Si se crea un nuevo producto
    if(this.productsCatalogService.selectedProduct()?.id === 0) {
      this.productsCatalogService.addNewProduct().subscribe({
        next: (response: Product) => {
          this.productsListService.addProduct(response);
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SECTIONS.CATALOGS.PRODUCTS.SUCCESSES.CREATED')
          });
          this.loading = false;
          if(this.deviceTypeService.isMobile()) {
            this.productsCatalogService.selectedProduct.set(null);
            this.location.back();
          }
          else {
            this.productsCatalogService.selectedProduct.set(response);
            this.productsCatalogService.selectedNonModifiedProduct = response;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.PRODUCTS.ERRORS.FIELDS_LACK')
          });
          this.loading = false;
        }
      });
    }

    // Si se edita un producto
    else {
      const selectedId: number | undefined = this.productsCatalogService.selectedProduct()?.id;
      if(selectedId && this.productsCatalogService.patchData.length > 0) {
        this.productsCatalogService.editProduct(selectedId).subscribe({
          next: (response: Product) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
              detail: this.translateService.instant('SECTIONS.CATALOGS.PRODUCTS.SUCCESSES.UPDATED')
            });
            this.productsCatalogService.patchData.splice(0);
            this.productsCatalogService.productUpdated = true;
            this.loading = false;
            if(this.deviceTypeService.isMobile()) {
              this.productsCatalogService.selectedProduct.set(null);
              this.location.back();
            }
            else {
              this.productsCatalogService.selectedProduct.set(response);
              this.productsCatalogService.selectedNonModifiedProduct = response;
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.PRODUCTS.ERRORS.UPDATE')
            });
            this.loading = false;
          }
        })
      }
    }
  }
}
