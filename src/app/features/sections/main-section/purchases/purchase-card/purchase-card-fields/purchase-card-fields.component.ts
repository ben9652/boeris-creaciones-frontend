import { AfterViewInit, Component, ElementRef, input, InputSignal, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DeviceTypeService } from '../../../../../../core/services/device-type/device-type.service';
import { Purchase } from '../../../../../../core/models/purchase.entities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { PaymentMethodParsePipe, ReceptionModeParsePipe } from './purchase-card-fields.pipes';
import { FixedTwoDecimalsPipe } from '../../../../../../core/pipes/fixed-two-decimals.pipe';

@Component({
  selector: 'app-purchase-card-fields',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    TooltipModule,
    DialogModule,
    ReceptionModeParsePipe,
    PaymentMethodParsePipe,
    FixedTwoDecimalsPipe
  ],
  templateUrl: './purchase-card-fields.component.html',
  styleUrl: './purchase-card-fields.component.scss'
})
export class PurchaseCardFieldsComponent {
  purchase: InputSignal<Purchase> = input.required<Purchase>();

  @ViewChild('fields') fieldsCont!: ElementRef;
  @ViewChild('idContainer') idCont!: ElementRef;
  @ViewChild('textDescriptionContainer') textCont!: ElementRef;
  @ViewChild('textContainerTitle') textTitleCont!: ElementRef;
  @ViewChild('description') text!: ElementRef;
  @ViewChild('opDescription') popoverDescription!: ElementRef;
  
  isTextOverflowed: boolean = false;

  displayDescription: boolean = false;
  
  constructor(
    public translateService: TranslateService,
    public deviceTypeService: DeviceTypeService
  ) {
    
  }
  
  showDescription($event: MouseEvent) {
    this.displayDescription = true;
  }
}
