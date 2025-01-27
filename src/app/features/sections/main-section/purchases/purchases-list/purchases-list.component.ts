import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { Purchase } from '../../../../../core/models/purchase.entities';
import { PurchaseCardComponent } from '../purchase-card/purchase-card.component';
import { User } from '../../../../../core/models/user.entities';
import { SkeletonModule } from 'primeng/skeleton';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor(
    private deviceTypeService: DeviceTypeService
  ) {
    const isMobile: boolean = deviceTypeService.isMobile();
    if (isMobile) {
      this.skeletonsHeight = '257px';
    }
  }
}
