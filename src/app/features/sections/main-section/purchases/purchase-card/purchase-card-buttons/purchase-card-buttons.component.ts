import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Purchase } from '../../../../../../core/models/purchase.entities';
import { TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-purchase-card-buttons',
  imports: [
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './purchase-card-buttons.component.html',
  styleUrl: './purchase-card-buttons.component.scss',
  providers: [TranslateService]
})
export class PurchaseCardButtonsComponent {
  purchase: InputSignal<Purchase> = input.required<Purchase>();

  onShowSummary: OutputEmitterRef<void> = output<void>();
  onShowReception: OutputEmitterRef<void> = output<void>();
  onCancelation: OutputEmitterRef<Event> = output<Event>();

  constructor(public translateService: TranslateService) {

  }

  
}
