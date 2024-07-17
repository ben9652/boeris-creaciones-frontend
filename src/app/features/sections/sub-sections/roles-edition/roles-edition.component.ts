import { Component } from '@angular/core';
import { RolesComponent } from '../../main-section/partners/roles/roles.component';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';
import { Partner } from '../../../../core/models/partner.entities';
import { PartnersService } from '../../main-section/partners/partners.service';

@Component({
  selector: 'app-roles-edition',
  standalone: true,
  imports: [
    RolesComponent,
    BannerSubsectionsComponent
  ],
  templateUrl: './roles-edition.component.html',
  styleUrl: './roles-edition.component.scss'
})
export class RolesEditionComponent {
  firstName: string;
  lastName?: string;
  
  constructor(
    private partnersService: PartnersService
  ) {
    const partner: Partner = partnersService.partner;
    this.firstName = partner.firstName;
    this.lastName = partner.lastName;
  }
}
