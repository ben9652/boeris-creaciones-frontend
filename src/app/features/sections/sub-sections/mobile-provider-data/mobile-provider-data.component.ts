import { Component } from '@angular/core';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';
import { ProviderDataFormComponent } from '../../main-section/providers-catalog/provider-data-form/provider-data-form.component';

@Component({
  selector: 'app-mobile-provider-data',
  standalone: true,
  imports: [
    BannerSubsectionsComponent,
    ProviderDataFormComponent
  ],
  templateUrl: './mobile-provider-data.component.html',
  styleUrl: './mobile-provider-data.component.scss'
})
export class MobileProviderDataComponent {

}
