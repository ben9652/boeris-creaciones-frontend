import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProviderDataFormComponent } from './provider-data-form/provider-data-form.component';
import { DeviceTypeService } from '../../../../core/services/device-type.service';

@Component({
  selector: 'app-providers-catalog',
  standalone: true,
  imports: [
    DividerModule,
    ProvidersListComponent,
    ProviderDataFormComponent
  ],
  templateUrl: './providers-catalog.component.html',
  styleUrl: './providers-catalog.component.scss'
})
export class ProvidersCatalogComponent {
  constructor(public deviceTypeService: DeviceTypeService) {
    
  }
}
