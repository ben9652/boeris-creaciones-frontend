import { Component, effect, input, InputSignal, output, OutputEmitterRef, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsListService } from '../../products-list/products-list.service';
import { Product } from '../../../../../../core/models/product.entities';
import { ProductsCatalogService } from '../../products-catalog.service';
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss',
  providers: [TranslateService]
})
export class ImageManagerComponent {
  loadingImage: boolean = true;

  selectedProduct: InputSignal<Product | null> = input.required();

  disabled: InputSignal<boolean> = input.required<boolean>();
  uploadEvent: OutputEmitterRef<File> = output<File>();

  imageSrc: string | null = null;

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;

  constructor(
    public productsCatalogService: ProductsCatalogService,
    private sanitizer: DomSanitizer,
    public translateService: TranslateService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedProduct = changes['selectedProduct'];
    if(
      selectedProduct &&
      (selectedProduct.previousValue === undefined ||
      selectedProduct.previousValue === null ||
      selectedProduct.currentValue === null ||
      selectedProduct.previousValue.id !== selectedProduct.currentValue.id ||
      selectedProduct.previousValue.picture !== selectedProduct.currentValue.picture)
    ) {
      this.updateImage();
    }
  }

  updateImage() {
    this.loadingImage = true;
    
    this.imageSrc = null;
    
    setTimeout(() => {
      this.imageSrc = this.getImage();
    }, 0);
  }

  getImage(): string {
    const selectedProduct: Product | null = this.productsCatalogService.selectedProduct();
    if(selectedProduct && selectedProduct.picture) {
      return this.sanitizer.bypassSecurityTrustUrl(selectedProduct.picture) as string;
    }
    else {
      return this.translateService.instant('SECTIONS.CATALOGS.PRODUCTS.PICTURE.DEFAULT');
    }
  }

  onImageLoad() {
    this.loadingImage = false;
  }

  onImageError() {
    this.loadingImage = false;
    this.imageSrc = null;
  }

  onUploadHandler(event: any) {
    const file: File = event.currentFiles[0];

    this.uploadEvent.emit(file);
    this.fileUploadComponent.clear();
  }
}
