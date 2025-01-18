import { Component, input, InputSignal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DeviceTypeService } from '../../../../../../core/services/device-type/device-type.service';
import { Purchase } from '../../../../../../core/models/purchase.entities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-purchase-card-fields',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    TooltipModule
  ],
  templateUrl: './purchase-card-fields.component.html',
  styleUrl: './purchase-card-fields.component.scss'
})
export class PurchaseCardFieldsComponent {
  purchase: InputSignal<Purchase> = input.required<Purchase>();
  
  constructor(
    public translateService: TranslateService,
    public deviceTypeService: DeviceTypeService
  ) {
    
  }
}
