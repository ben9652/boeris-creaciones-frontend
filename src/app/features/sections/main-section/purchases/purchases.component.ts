import { Component } from '@angular/core';
import { PurchasesService } from './purchases.service';
import { User } from '../../../../core/models/user.entities';
import { Purchase } from '../../../../core/models/purchase.entities';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PurchasesHeaderComponent } from './purchases-header/purchases-header.component';

@Component({
    selector: 'app-purchases',
    imports: [
        PurchasesHeaderComponent,
        PurchasesListComponent,
        ToastModule,
        ButtonModule
    ],
    templateUrl: './purchases.component.html',
    styleUrl: './purchases.component.scss',
    providers: [MessageService, TranslateService]
})
export class PurchasesComponent {
    visiblePurchases: Purchase[] | undefined;
    user: User;
    
    constructor(
        private purchasesService: PurchasesService,
        private messageService: MessageService,
        private translateService: TranslateService,
        private router: Router
    ) {
        this.user = purchasesService.getUser();
        purchasesService.getPurchases(this.user.id_user).subscribe({
            next: (purchases: Purchase[]) => {
                this.visiblePurchases = purchases;
                purchasesService.purchases.set(purchases);
            },
            error: (error: any) => {
                console.error(error);
            }
        })
    }

    onPurchaseReceiving(purchase: Purchase): void {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.MESSAGES.RECEIVED.HEADER'),
          detail: `La compra ${purchase.id} ha sido recibida con éxito`
        });
    }

    onPurchaseCanceling(purchase: Purchase): void {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('SECTIONS.PROVISIONS.PURCHASES.CARD.MESSAGES.CANCELED.HEADER'),
          detail: `La compra ${purchase.id} ha sido cancelada con éxito`
        });
    }

    onError(error: HttpErrorResponse) {
        if (error.status === 403) {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: this.translateService.instant('SHARED.MESSAGES.DETAIL.FORBIDDEN')
            });
        }
        else {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: error.error.message
            });
        }
    }

    goToNewPurchase(): void {
        this.router.navigate(['new-purchase']);
    }

    onFilterChangesHandler(filters: string[]): void {
        this.visiblePurchases = this.purchasesService.filterPurchases(filters);
    }
}
