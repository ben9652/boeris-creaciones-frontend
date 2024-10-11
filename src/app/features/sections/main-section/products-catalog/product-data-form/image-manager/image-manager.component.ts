import { Component, effect, input, InputSignal, output, OutputEmitterRef, ViewChild } from '@angular/core';
import { ProductsListService } from '../../products-list/products-list.service';
import { Product } from '../../../../../../core/models/product.entities';
import { ProductsCatalogService } from '../../products-catalog.service';
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule
  ],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss'
})
export class ImageManagerComponent {
  loadingImage: boolean = true;

  picture: InputSignal<string | null> = input.required<string | null>();
  disabled: InputSignal<boolean> = input.required<boolean>();
  uploadEvent: OutputEmitterRef<File> = output<File>();

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;

  constructor(
    public productsCatalogService: ProductsCatalogService
  ) {
    
  }

  getImage(): string {
    const defaultImage: string = 'pictures/cube-solid.svg';
    const picture: string | null = this.picture();

    return picture !== null ? picture : defaultImage;
  }

  onImageLoad() {
    this.loadingImage = false;
  }

  onImageError() {
    this.loadingImage = false;
  }

  onUploadHandler(event: any) {
    const file: File = event.currentFiles[0];

    this.uploadEvent.emit(file);
    this.fileUploadComponent.clear();
  }
}
