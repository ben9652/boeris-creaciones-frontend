import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RawMaterialCatalogService } from '../../raw-material-catalog.service';

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.scss'
})
export class ImageManagerComponent {

  constructor(private rawMaterialCatalogService: RawMaterialCatalogService) {

  }

  getImage(): string{
    const defaultImage = 'pictures/leaf-solid.svg';
    return this.rawMaterialCatalogService.selectedRawMaterial()?.picture ? `${this.rawMaterialCatalogService.selectedRawMaterial()?.picture}` : defaultImage;
  }

  disabledEdition(): boolean{
    return this.rawMaterialCatalogService.disableDataEdition();
  }
}
