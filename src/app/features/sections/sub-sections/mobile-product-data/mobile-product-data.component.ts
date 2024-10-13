import { Component } from '@angular/core';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';
import { ProductDataFormComponent } from '../../main-section/products-catalog/product-data-form/product-data-form.component';

@Component({
  selector: 'app-mobile-product-data',
  standalone: true,
  imports: [
    BannerSubsectionsComponent,
    ProductDataFormComponent
  ],
  templateUrl: './mobile-product-data.component.html',
  styleUrl: './mobile-product-data.component.scss'
})
export class MobileProductDataComponent {

}
