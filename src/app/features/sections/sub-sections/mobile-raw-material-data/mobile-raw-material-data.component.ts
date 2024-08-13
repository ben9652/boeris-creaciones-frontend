import { Component } from '@angular/core';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';
import { RawMaterialsDataComponent } from '../../main-section/raw-materials-catalog/raw-materials-data/raw-materials-data.component';

@Component({
  selector: 'app-mobile-raw-material-data',
  standalone: true,
  imports: [
    BannerSubsectionsComponent,
    RawMaterialsDataComponent
  ],
  templateUrl: './mobile-raw-material-data.component.html',
  styleUrl: './mobile-raw-material-data.component.scss'
})
export class MobileRawMaterialDataComponent {

}
