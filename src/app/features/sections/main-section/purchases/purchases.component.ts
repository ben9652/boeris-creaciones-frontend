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
import { SearchObject } from '../../../../core/models/searchObj.entities';

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

    filters: string[] = [];
    search: SearchObject = {
        key: "id",
        name: ""
    };
    sort: string[] = [];
    ascendingSort: boolean = false;
    
    constructor(
        private purchasesService: PurchasesService,
        private messageService: MessageService,
        public translateService: TranslateService,
        private router: Router
    ) {
        this.user = purchasesService.getUser();
        purchasesService.getPurchases(this.user.id_user).subscribe({
            next: (purchases: Purchase[]) => {
                this.visiblePurchases = purchases;
                purchasesService.purchases.set(purchases);
                this.onSortHandler(['1', '0']);
                this.onSearchInputHandler(this.search);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
                    detail: error.error.message
                });
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
        this.filters = filters;

        if (this.search.name !== "") {
            this.visiblePurchases = this.purchasesService.searchPurchases(this.search, this.visiblePurchases);
        }
    }

    private searchAction(search: SearchObject): void {
        const purchases: Purchase[] = this.purchasesService.searchPurchases(search);
        this.search = search;
        this.visiblePurchases = purchases;
    }

    onSearchInputHandler(search: SearchObject): void {
        this.searchAction(search);

        if (this.filters.length > 0) {
            this.visiblePurchases = this.purchasesService.filterPurchases(this.filters, this.visiblePurchases);
        }
    }

    onSortHandler(sort: string[]): void {
        this.sort = sort;

        this.visiblePurchases = this.purchasesService.sortPurchases(sort, this.ascendingSort);

        this.searchAction(this.search);
    }

    onSortDirectionHandler(ascendingSort: boolean): void {
        this.ascendingSort = ascendingSort;

        this.visiblePurchases = this.purchasesService.sortPurchases(this.sort, ascendingSort);

        this.searchAction(this.search);
    }
}
