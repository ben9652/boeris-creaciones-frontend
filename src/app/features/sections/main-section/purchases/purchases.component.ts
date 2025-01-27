import { Component } from '@angular/core';
import { PurchasesService } from './purchases.service';
import { User } from '../../../../core/models/user.entities';
import { Purchase } from '../../../../core/models/purchase.entities';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';

@Component({
    selector: 'app-purchases',
    imports: [
        PurchasesListComponent
    ],
    templateUrl: './purchases.component.html',
    styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {
    purchases: Purchase[] | undefined;
    user: User;
    
    constructor(
        private purchasesService: PurchasesService
    ) {
        this.user = purchasesService.getUser();
        purchasesService.getPurchases(this.user.id_user).subscribe({
            next: (purchases: Purchase[]) => {
                this.purchases = purchases;
            },
            error: (error: any) => {
                console.error(error);
            }
        })
    }
}
