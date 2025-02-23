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
import { Partner } from '../../../../core/models/partner.entities';
import { Branch } from '../../../../core/models/branch.entities';
import { Provider } from '../../../../core/models/provider.entities';

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

    const filteredPurchases: Purchase[] = purchases.filter((purchase: Purchase) => {
      const searchValue: string = search.name.toLowerCase();
      // Conseguir el nombre de la propiedad de Purchase, que sería `search.getKey()`
      const purchaseAttribute = search.key as keyof Purchase;
      const purchaseValue = purchase[purchaseAttribute];
      if (purchaseValue) {
        if (purchaseAttribute === 'requester_partner') {
          const requesterPartner = purchaseValue as Partner;
          if (requesterPartner.lastName) {
            return requesterPartner.firstName.toLowerCase().includes(searchValue) || requesterPartner.lastName.toLowerCase().includes(searchValue);
          }
          else {
            return requesterPartner.firstName.toLowerCase().includes(searchValue);
          }
        }
        if (purchaseAttribute === 'provider') {
          const provider: Provider = purchaseValue as Provider;
          if (provider.name) {
            return provider.name.toLowerCase().includes(searchValue);
          }
        }
        if (purchaseAttribute === 'reception_branch') {
          const receptionBranch = purchaseValue as Branch;
          if (receptionBranch.name) {
            return receptionBranch.name.toLowerCase().includes(searchValue);
          }
        }
        return purchaseValue.toString().toLowerCase().includes(searchValue);
      }
      
      return false;
    });

    return filteredPurchases;
  }

  sortPurchases(sort: string[], ascendingSort: boolean): Purchase[] {
    const purchases: Purchase[] = this.purchases();
    if(sort.length === 0) {
      return purchases;
    }

    const firstIndex: number = parseInt(sort[0]);
    const secondIndex: number = parseInt(sort[1]);

    const sortedPurchases: Purchase[] = purchases.sort((a: Purchase, b: Purchase) => {
      if (firstIndex === 0) {
        if (secondIndex === 0) {
          if (a.provider.name && b.provider.name) {
            if (ascendingSort) {
              return a.provider.name.localeCompare(b.provider.name);
            }
            else {
              return b.provider.name.localeCompare(a.provider.name);
            }
          }
          return 0;
        }
        else if (secondIndex === 1) {
          if (ascendingSort) {
            return a.requester_partner.firstName.localeCompare(b.requester_partner.firstName);
          }
          else {
            return b.requester_partner.firstName.localeCompare(a.requester_partner.firstName);
          }
        }
        else if (secondIndex === 2) {
          if (a.reception_branch && b.reception_branch && a.reception_branch.name && b.reception_branch.name) {
            if (ascendingSort) {
              return a.reception_branch.name.localeCompare(b.reception_branch.name);
            }
            else {
              return b.reception_branch.name.localeCompare(a.reception_branch.name);
            }
          }
          return 0;
        }
      }
      else if (firstIndex === 1) {
        if (secondIndex === 0) {
          if (ascendingSort) {
            return a.order_date.getTime() - b.order_date.getTime();
          }
          else {
            return b.order_date.getTime() - a.order_date.getTime();
          }
        }
        else if (secondIndex === 1) {
          if (a.reception_date && b.reception_date) {
            if (ascendingSort) {
              return a.reception_date.getTime() - b.reception_date.getTime();
            }
            else {
              return b.reception_date.getTime() - a.reception_date.getTime();
            }
          }
          return 0;
        }
        else if (secondIndex === 2) {
          if (a.cancel_date && b.cancel_date) {
            if (ascendingSort) {
              return a.cancel_date.getTime() - b.cancel_date.getTime();
            }
            else {
              return b.cancel_date.getTime() - a.cancel_date.getTime();
            }
          }
          return 0;
        }
        return 0;
      }
      else if (firstIndex === 2) {
        if (secondIndex === 0) {
          if (ascendingSort) {
            if (a.final_price && b.final_price) {
              return a.final_price - b.final_price;
            }
            else if (a.final_price) {
              return a.final_price - b.budget;
            }
            else if (b.final_price) {
              return a.budget - b.final_price;
            }
            else {
              return a.budget - b.budget;
            }
          }
          else {
            if (a.final_price && b.final_price) {
              return b.final_price - a.final_price;
            }
            else if (b.final_price) {
              return b.final_price - a.budget;
            }
            else if (a.final_price) {
              return a.final_price - b.budget;
            }
            else {
              return b.budget - a.budget;
            }
          }
        }
        else if (secondIndex === 1) {
          if (ascendingSort) {
            return a.id - b.id;
          }
          else {
            return b.id - a.id;
          }
        }
        return 0;
      }
      
      return 0;
    });

    return sortedPurchases;
  }
}
