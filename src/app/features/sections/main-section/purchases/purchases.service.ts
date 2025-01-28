import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { Purchase } from '../../../../core/models/purchase.entities';
import { environment } from '../../../../../environments/environment';
import { DataAccessService } from '../../../../core/services/data-access/data-access.service';
import { HttpClient } from '@angular/common/http';
import { createEmptyUser, User } from '../../../../core/models/user.entities';
import { Observable } from 'rxjs';
import { ReceptionObject } from '../../../../core/models/receptionObject.entities';

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
}
