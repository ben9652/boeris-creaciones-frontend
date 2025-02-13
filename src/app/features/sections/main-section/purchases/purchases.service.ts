import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { NewPurchase, Purchase } from '../../../../core/models/purchase.entities';
import { environment } from '../../../../../environments/environment';
import { DataAccessService } from '../../../../core/services/data-access/data-access.service';
import { HttpClient } from '@angular/common/http';
import { createEmptyUser, User } from '../../../../core/models/user.entities';
import { Observable } from 'rxjs';
import { ReceptionObject } from '../../../../core/models/receptionObject.entities';
import { SearchObject } from '../../../../core/models/searchObj.entities';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  urlBase: string;
  httpOptions?: HttpOptions;

  purchases: WritableSignal<Purchase[]> = signal<Purchase[]>([]);

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'Compras';
    this.httpOptions = new HttpOptions(dataAccessService.getToken());
  }

  getPurchases(userId: number): Observable<Purchase[]> {
    if(this.httpOptions === undefined) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    }

    const apiUrl: string = this.urlBase + '?userId=' + userId;

    return this.http.get<Purchase[]>(apiUrl, this.httpOptions);
  }

  getUser(): User {
    const user: User | null = this.dataAccessService.getUser();
    if(user) {
      return user;
    }
    return createEmptyUser();
  }

  addPurchase(purchase: Purchase): void {
    const purchases: Purchase[] = this.purchases();
    purchases.push(purchase);
    this.purchases.set(purchases);
  }

  createPurchase(purchase: NewPurchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.urlBase, purchase, this.httpOptions);
  }

  receivePurchase(purchase_id: number, userId: number, reception: ReceptionObject): Observable<Purchase> {
    const apiUrl: string = this.urlBase + '/recibir/' + purchase_id + '-' + userId;
    return this.http.post<Purchase>(apiUrl, reception, this.httpOptions);
  }

  cancelPurchase(purchase_id: number, userId: number): Observable<Purchase> {
    const apiUrl: string = this.urlBase + '/cancelar/' + purchase_id + '-' + userId;
    return this.http.post<Purchase>(apiUrl, null, this.httpOptions);
  }

  deletePurchase(purchase_id: number, userId: number): Observable<void> {
    const apiUrl: string = this.urlBase + '/' + purchase_id + '-' + userId;
    return this.http.delete<void>(apiUrl, this.httpOptions);
  }

  uploadInvoice(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const apiUrl: string = this.urlBase + '/upload-file';
    const httpOptionsToCreateFile: HttpOptions = new HttpOptions(this.dataAccessService.getToken(), true);
    return this.http.post<string>(apiUrl, formData, httpOptionsToCreateFile);
  }

  filterPurchases(filters: string[]): Purchase[] {
    const purchases: Purchase[] = this.purchases();
    if(filters.length === 0) {
      return purchases;
    }
    
    return purchases.filter((purchase: Purchase) => {
      console.log(purchase);
      return filters.includes(purchase.state);
    });
  }

  searchPurchases(search: SearchObject): Purchase[] {
    const purchases: Purchase[] = this.purchases();
    if(search.name === '') {
      return purchases;
    }

    return purchases.filter((purchase: Purchase) => {
      const searchValue: string = search.name.toLowerCase();
      // Conseguir el nombre de la propiedad de Purchase, que sería `search.getKey()`
      const purchaseAttribute = search.key as keyof Purchase;
      const purchaseValue = purchase[purchaseAttribute];
      if (purchaseValue) {
        return purchaseValue.toString().toLowerCase().includes(searchValue);
      }
      
      return false;
    });
  }
}
