import { Component, input, InputSignal, output, OutputEmitterRef, SimpleChanges, ViewChild } from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RawMaterial } from '../../../../../../core/models/rawMaterial.entities';
import { RawMaterialsCatalogService } from '../../raw-materials-catalog.service';
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

  selectedRawMaterial: InputSignal<RawMaterial | null> = input.required<RawMaterial | null>();

  disabled: InputSignal<boolean> = input.required<boolean>();
  uploadEvent: OutputEmitterRef<File> = output<File>();

  imageSrc: string | null = null;

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;

  constructor(
    public rawMaterialsCatalogService: RawMaterialsCatalogService,
    private sanitizer: DomSanitizer,
    public translateService: TranslateService
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedRawMaterial = changes['selectedRawMaterial'];
    if(
      selectedRawMaterial &&
      (
        selectedRawMaterial.previousValue === undefined ||
        selectedRawMaterial.previousValue === null ||
        selectedRawMaterial.currentValue === null ||
        selectedRawMaterial.previousValue.id !== selectedRawMaterial.currentValue.id ||
        selectedRawMaterial.previousValue.picture !== selectedRawMaterial.currentValue.picture
      )
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
    const selectedRawMaterial: RawMaterial | null = this.rawMaterialsCatalogService.selectedRawMaterial();
    if(selectedRawMaterial && selectedRawMaterial.picture) {
      return this.sanitizer.bypassSecurityTrustUrl(selectedRawMaterial.picture) as string;
    }
    else {
      return this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.PICTURE.DEFAULT');
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
