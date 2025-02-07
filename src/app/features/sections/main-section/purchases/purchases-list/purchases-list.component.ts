import { Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { Purchase } from '../../../../../core/models/purchase.entities';
import { PurchaseCardComponent } from '../purchase-card/purchase-card.component';
import { User } from '../../../../../core/models/user.entities';
import { SkeletonModule } from 'primeng/skeleton';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-purchases-list',
  imports: [
    ScrollerModule,
    PurchaseCardComponent,
    SkeletonModule,
    TranslateModule
  ],
  templateUrl: './purchases-list.component.html',
  styleUrl: './purchases-list.component.scss'
})
export class PurchasesListComponent {
  purchases: InputSignal<Purchase[] | undefined> = input.required<Purchase[] | undefined>();
  user: InputSignal<User> = input.required<User>();

  skeletonsHeight: string = '142px';
  cardHeight: number = 142;

  onPurchaseReceiving: OutputEmitterRef<Purchase> = output<Purchase>();
  onPurchaseCanceling: OutputEmitterRef<Purchase> = output<Purchase>();
  onError: OutputEmitterRef<HttpErrorResponse> = output<HttpErrorResponse>();

  constructor(
    private deviceTypeService: DeviceTypeService
  ) {
    const isMobile: boolean = deviceTypeService.isMobile();
    if (isMobile) {
      this.skeletonsHeight = '257px';
      this.cardHeight = 300;
    }
  }

  onPurchaseReceive(purchase: Purchase): void {
    this.onPurchaseReceiving.emit(purchase);
  }

  onPurchaseCancel(purchase: Purchase): void {
    this.onPurchaseCanceling.emit(purchase);
  }

  onCardError(error: HttpErrorResponse): void {
    this.onError.emit(error);
  }
}
