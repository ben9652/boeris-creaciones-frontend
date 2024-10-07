import { Component, output, OutputEmitterRef, ViewChild } from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { RawMaterialCatalogService } from '../../raw-material-catalog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [FileUploadModule, CommonModule],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss'
})
export class ImageManagerComponent {
  uploadEvent: OutputEmitterRef<File> = output<File>();

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;
  
  constructor(public rawMaterialCatalogService: RawMaterialCatalogService) {
    
  }

  getImage(): string{
    const defaultImage = 'pictures/leaf-solid.svg';
    return this.rawMaterialCatalogService.selectedRawMaterial()?.picture ? `${this.rawMaterialCatalogService.selectedRawMaterial()?.picture}` : defaultImage;
  }

  disabledEdition(): boolean{
    return this.rawMaterialCatalogService.disableDataEdition();
  }

  onUploadHandler(event: any) {
    const file: File = event.currentFiles[0];

    this.uploadEvent.emit(file);
    this.fileUploadComponent.clear();
  }
}
