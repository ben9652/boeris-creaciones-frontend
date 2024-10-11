import { Component } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDataFormComponent } from './product-data-form/product-data-form.component';
import { DividerModule } from 'primeng/divider';
import { DeviceTypeService } from '../../../../core/services/device-type.service';

@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [
    ProductsListComponent,
    ProductDataFormComponent,
    DividerModule
  ],
  templateUrl: './products-catalog.component.html',
  styleUrl: './products-catalog.component.scss'
})
export class ProductsCatalogComponent {

  constructor(
    public deviceType: DeviceTypeService
  ) {
    
  }

  isMobile() {
    const isMobile: boolean = this.deviceType.isMobile();
    return isMobile;
  }
}
