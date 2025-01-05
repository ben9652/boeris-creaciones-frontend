import { Component } from '@angular/core';
import { RolesComponent } from '../../main-section/partners/roles/roles.component';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';

@Component({
    selector: 'app-roles-edition',
    imports: [
        RolesComponent,
        BannerSubsectionsComponent
    ],
    templateUrl: './roles-edition.component.html',
    styleUrl: './roles-edition.component.scss'
})
export class RolesEditionComponent {
  constructor(
    
  ) {
    
  }
}
