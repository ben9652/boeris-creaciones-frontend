import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RawMaterialListComponent } from "./raw-material-list/raw-material-list.component";
import { RawMaterialDataFormComponent } from './raw-material-data-form/raw-material-data-form.component';
import { RawMaterialCatalogService } from './raw-material-catalog.service';

@Component({
  selector: 'app-raw-materials-catalog',
  standalone: true,
  imports: [RawMaterialListComponent, RawMaterialDataFormComponent, DividerModule],
  templateUrl: './raw-materials-catalog.component.html',
  styleUrl: './raw-materials-catalog.component.scss'
})
export class RawMaterialsCatalogComponent {

  constructor(public rawMaterialCatalogService: RawMaterialCatalogService) {

  }

  ngDoCheck(): void {
    const isMobile = sessionStorage.getItem('isMobile') !== null ? true : false; 
    this.rawMaterialCatalogService.isMobile.set(isMobile);
  }

  getIsMobileFromService(): boolean {
    return this.rawMaterialCatalogService.isMobile();
  }

}
