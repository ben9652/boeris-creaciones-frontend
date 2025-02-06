import { Component, input, InputSignal } from '@angular/core';
import { PurchaseSummary } from '../../../../../core/models/purchaseSummary.entities';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { FixedTwoDecimalsPipe } from '../../../../../core/pipes/fixed-two-decimals.pipe';

@Component({
  selector: 'app-purchase-summary',
  imports: [
    TableModule,
    TranslateModule,
    FixedTwoDecimalsPipe
  ],
  templateUrl: './purchase-summary.component.html',
  styleUrl: './purchase-summary.component.scss'
})
export class PurchaseSummaryComponent {
  purchaseSummary: InputSignal<PurchaseSummary> = input.required<PurchaseSummary>();

  constructor () {
    
  }
}
