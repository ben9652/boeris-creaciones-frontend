import { AfterViewInit, Component, input, InputSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { TranslateService } from '@ngx-translate/core';
import { Purchase } from '../../../../../core/models/purchase.entities';
import { PurchaseCardFieldsComponent } from './purchase-card-fields/purchase-card-fields.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { User } from '../../../../../core/models/user.entities';
import { ToastModule } from 'primeng/toast';
import { PurchaseSummaryComponent } from '../purchase-summary/purchase-summary.component';
import { DialogModule } from 'primeng/dialog';
import { PurchaseSummary } from '../../../../../core/models/purchaseSummary.entities';
import { PurchaseReceptionComponent } from '../purchase-reception/purchase-reception.component';
import { ReceptionObject } from '../../../../../core/models/receptionObject.entities';

@Component({
  selector: 'app-purchase-card',
  imports: [
    CardModule,
    PurchaseCardFieldsComponent,
    CommonModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    PurchaseSummaryComponent,
    PurchaseReceptionComponent,
    DialogModule
  ],
  templateUrl: './purchase-card.component.html',
  styleUrl: './purchase-card.component.scss',
  providers: [TranslateService, ConfirmationService, MessageService]
})
export class PurchaseCardComponent implements AfterViewInit {
  purchase: InputSignal<Purchase> = input.required<Purchase>();
  user: InputSignal<User> = input.required<User>();
  
  purchaseSummary: PurchaseSummary;

  showSummary: boolean = false;
  showReception: boolean = false;
  
  constructor(
    public deviceTypeService: DeviceTypeService,
    public translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.purchaseSummary = {
      id_purchase: 0,
      date: new Date(),
      items: [],
      total: 0
    }
  }

  ngAfterViewInit(): void {
    const totalPrice: number = this.purchase().raw_materials.reduce((acc, item) => acc + item.total, 0);
    this.purchaseSummary = {
      id_purchase: this.purchase().id,
      date: this.purchase().order_date,
      items: this.purchase().raw_materials,
      total: totalPrice
    }
  }

  receivePurchase(event: ReceptionObject) {
    this.purchase().reception_branch = {
      id: event.branch.id,
      name: event.branch.name,
      domicile: event.branch.domicile,
      locality: {id: 1, name: 'San Miguel', province: {id: 1, name: 'Tucumán'}},
    };

    this.purchase().status = 'R';
    this.purchase().reception_date = new Date();
    if(event.invoice !== null) {
      this.purchase().invoice = event.invoice.name;
    }

    this.showReception = false;
  }

  cancelPurchase(event: Event) {
    const estimatedGender: string = this.user().firstName[this.user().firstName.length - 1] === 'a' ? 'f' : 'm';
    console.log(estimatedGender);

    let confirmationMessage: string = this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.MESSAGES.CONFIRM_CANCEL');

    if(estimatedGender === 'f') {
      confirmationMessage = confirmationMessage.slice(0, 12) + 'a' + confirmationMessage.slice(13);
    }

    const headerLabel: string = this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.MESSAGES.HEADER_CANCEL');
    const toastSummary: string = this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.TOAST.CANCELED.HEADER');
    const toastDetail: string = this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.TOAST.CANCELED.DETAIL');

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: confirmationMessage,
      header: headerLabel,
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: this.translateService.instant('SHARED.BUTTONS.CANCEL'),
        severity: 'secondary'
      },
      acceptButtonProps: {
        label: this.translateService.instant('SHARED.BUTTONS.CONFIRM')
      },
      accept: () => {
        this.purchase().status = 'C';
        this.purchase().canceled_date = new Date();
        
        this.messageService.add({ severity: 'info', summary: toastSummary, detail: toastDetail });
      },
      reject: () => {}
    });
  }
}
