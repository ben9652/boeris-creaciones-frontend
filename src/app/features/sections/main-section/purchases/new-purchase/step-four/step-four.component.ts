import { Component, input, InputSignal, OnInit } from '@angular/core';
import { PurchaseSummaryComponent } from '../../purchase-summary/purchase-summary.component';
import { Provider } from '../../../../../../core/models/provider.entities';
import { ItemPurchaseSummary, PurchaseSummary } from '../../../../../../core/models/purchaseSummary.entities';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-step-four',
  imports: [
    PurchaseSummaryComponent,
    TranslateModule
  ],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.scss'
})
export class StepFourComponent implements OnInit {
  provider: InputSignal<Provider> = input.required<Provider>();
  purchased_raw_materials: InputSignal<ItemPurchaseSummary[]> = input.required<ItemPurchaseSummary[]>();

  purchaseSummary?: PurchaseSummary;

  constructor() {

  }
  
  ngOnInit(): void {
    this.purchaseSummary = {
      id_purchase: 0,
      date: new Date(),
      items: this.purchased_raw_materials(),
      total: this.purchased_raw_materials().reduce((acc, item) => acc + item.quantity * item.unit_price, 0)
    }
  }
}
