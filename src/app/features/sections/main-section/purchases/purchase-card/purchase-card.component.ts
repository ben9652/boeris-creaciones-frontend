import { AfterViewInit, Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Purchase } from '../../../../../core/models/purchase.entities';
import { PurchaseCardFieldsComponent } from './purchase-card-fields/purchase-card-fields.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { User } from '../../../../../core/models/user.entities';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PurchaseSummaryComponent } from '../purchase-summary/purchase-summary.component';
import { DialogModule } from 'primeng/dialog';
import { PurchaseSummary } from '../../../../../core/models/purchaseSummary.entities';
import { PurchaseReceptionComponent } from '../purchase-reception/purchase-reception.component';
import { ReceptionObject } from '../../../../../core/models/receptionObject.entities';
import { Branch } from '../../../../../core/models/branch.entities';
import { PurchasesService } from '../purchases.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Image } from 'primeng/image';
import { PurchaseCardButtonsComponent } from './purchase-card-buttons/purchase-card-buttons.component';

@Component({
  selector: 'app-purchase-card',
  imports: [
    CardModule,
    PurchaseCardFieldsComponent,
    CommonModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    PurchaseSummaryComponent,
    PurchaseReceptionComponent,
    PurchaseCardButtonsComponent,
    DialogModule,
    TranslateModule,
    PdfViewerModule,
    Image
  ],
  templateUrl: './purchase-card.component.html',
  styleUrl: './purchase-card.component.scss',
  providers: [TranslateService, ConfirmationService]
})
export class PurchaseCardComponent implements OnInit {
  purchase: InputSignal<Purchase> = input.required<Purchase>();
  user: InputSignal<User> = input.required<User>();

  statusTooltip: string = 'Pedida';
  
  purchaseSummary: PurchaseSummary;

  showSummary: boolean = false;
  showReception: boolean = false;

  receivingPurchase: boolean = false;
  
  onReceivedPurchase: OutputEmitterRef<Purchase> = output<Purchase>();
  onCancelPurchase: OutputEmitterRef<Purchase> = output<Purchase>();
  onError: OutputEmitterRef<HttpErrorResponse> = output<HttpErrorResponse>();
  
  constructor(
    public deviceTypeService: DeviceTypeService,
    public translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private purchasesService: PurchasesService
  ) {
    this.purchaseSummary = {
      id_purchase: 0,
      date: new Date(),
      items: [],
      total: 0
    }
  }
  
  ngOnInit(): void {
    const totalPrice: number = this.purchase().raw_materials.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
    this.purchaseSummary = {
      id_purchase: this.purchase().id,
      date: this.purchase().order_date,
      items: this.purchase().raw_materials,
      total: totalPrice
    }

    if(this.purchase().state === 'R') {
      this.statusTooltip = 'Recibida';
    }
    else if(this.purchase().state === 'C') {
      this.statusTooltip = 'Cancelada';
    }
  }

  setPurchase(purchase: Purchase) {
    this.purchase().id = purchase.id;
    this.purchase().requester_partner = purchase.requester_partner;
    this.purchase().provider = purchase.provider;
    this.purchase().description = purchase.description;
    this.purchase().raw_materials = { ...purchase.raw_materials };
    this.purchase().order_date = purchase.order_date;
    this.purchase().reception_date = purchase.reception_date;
    this.purchase().cancel_date = purchase.cancel_date;
    this.purchase().currency = purchase.currency;
    this.purchase().payment_type = purchase.payment_type;
    this.purchase().reception_mode = purchase.reception_mode;
    this.purchase().budget = purchase.budget;
    this.purchase().state = purchase.state;
    this.purchase().final_price = purchase.final_price;
    this.purchase().additional_amount_reason = purchase.additional_amount_reason;
    this.purchase().reception_branch = purchase.reception_branch;
    this.purchase().invoice = purchase.invoice;
  }

  receivePurchase(event: { reception: ReceptionObject, branch: Branch, invoice: File | null }) {
    this.receivingPurchase = true;
    event.reception.additional_amount -= this.purchase().budget;
    if(event.invoice !== null) {
      this.purchasesService.uploadInvoice(event.invoice).subscribe({
        next: (invoiceUrl: string) => {
          this.purchase().invoice = invoiceUrl;
          event.reception.invoice = invoiceUrl;
          this.purchasesService.receivePurchase(this.purchase().id, this.user().id_user, event.reception).subscribe({
            next: (purchase: Purchase) => {
              this.onReceivedPurchase.emit(purchase);
              this.setPurchase(purchase);
              this.showReception = false;
              this.receivingPurchase = false;
            },
            error: (err: HttpErrorResponse) => {
              this.onError.emit(err);
              this.showReception = false;
              this.receivingPurchase = false;
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.onError.emit(error);
          this.showReception = false;
          this.receivingPurchase = false;
        }
      });
    }
    else {
      this.purchasesService.receivePurchase(this.purchase().id, this.user().id_user, event.reception).subscribe({
        next: (purchase: Purchase) => {
          this.onReceivedPurchase.emit(purchase);
          this.setPurchase(purchase);
          this.showReception = false;
          this.receivingPurchase = false;
        },
        error: (error: HttpErrorResponse) => {
          this.onError.emit(error);
          this.showReception = false;
          this.receivingPurchase = false;
        }
      });
    }
  }

  cancelPurchase(event: Event) {
    const estimatedGender: string = this.user().firstName[this.user().firstName.length - 1] === 'a' ? 'f' : 'm';

    let confirmationMessage: string = this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.MESSAGES.CONFIRM_CANCEL');

    if(estimatedGender === 'f') {
      confirmationMessage = confirmationMessage.slice(0, 12) + 'a' + confirmationMessage.slice(13);
    }

    const headerLabel: string = this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.MESSAGES.HEADER_CANCEL');

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
        this.purchasesService.cancelPurchase(this.purchase().id, this.user().id_user).subscribe({
          next: (purchase: Purchase) => {
            this.onCancelPurchase.emit(purchase);
            this.setPurchase(purchase);
          },
          error: (error: HttpErrorResponse) => {
            this.onError.emit(error);
          }
        });
      },
      reject: () => {}
    });
  }
}
