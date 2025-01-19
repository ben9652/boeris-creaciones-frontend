import { Component, input, InputSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { TranslateService } from '@ngx-translate/core';
import { Purchase } from '../../../../../core/models/purchase.entities';
import { PurchaseCardFieldsComponent } from './purchase-card-fields/purchase-card-fields.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-card',
  imports: [
    CardModule,
    PurchaseCardFieldsComponent,
    CommonModule
  ],
  templateUrl: './purchase-card.component.html',
  styleUrl: './purchase-card.component.scss',
  providers: [TranslateService]
})
export class PurchaseCardComponent {
  purchase: InputSignal<Purchase> = input.required<Purchase>();
  
  constructor(
    public deviceTypeService: DeviceTypeService,
    public translateService: TranslateService
  ) {
    
  }
}
