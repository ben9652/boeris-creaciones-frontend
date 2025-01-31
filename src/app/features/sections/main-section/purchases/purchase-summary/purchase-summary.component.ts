import { Component, input, InputSignal } from '@angular/core';
import { PurchaseSummary } from '../../../../../core/models/purchaseSummary.entities';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-purchase-summary',
  imports: [
    TableModule,
    TranslateModule
  ],
  templateUrl: './purchase-summary.component.html',
  styleUrl: './purchase-summary.component.scss'
})
export class PurchaseSummaryComponent {
  purchaseSummary: InputSignal<PurchaseSummary> = input.required<PurchaseSummary>();

  constructor () {

  }
}
