import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { afterRender, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Partner, PartnerRegister } from '../../../../../core/models/partner.entities';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { DataAccessService } from '../../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ListPartnersService {
  urlBase: string;
  httpOptions?: HttpOptions;

  userAuthorized: boolean = true;

  // Observable para los socios existentes
  private _partners: WritableSignal<Partner[] | null> = signal<Partner[] | null>(null);

  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'Socios/';
  }

  askForPartners(): Observable<Partner[]> {
    this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    return this.http.get<Partner[]>(this.urlBase, this.httpOptions);
  }

  addPartner(partner: Partner) {
    const partners: Partner[] | null = this._partners();
    if(partners !== null) {
      this._partners.set([...partners, partner])
    }
  }

  getPartners(): Partner[] | null {
    const partners: Partner[] | null = this._partners();
    return partners;
  }

  setPartners(partners: Partner[]): void {
    this._partners.set(partners);
  }

  getPartner(id: number): Partner | undefined {
    return this._partners()?.find((partner: Partner) => partner.id_user === id);
  }

  getFirstPartner(): Partner | null {
    const partners: Partner[] | null = this._partners();
    if(partners === null) {
      return null;
    }
    return partners[0];
  }

  registerPartner(registerPartnerData: PartnerRegister): Observable<Partner | null> {
    return this.http.post<Partner | null>(this.urlBase, registerPartnerData, this.httpOptions);
  }
}
