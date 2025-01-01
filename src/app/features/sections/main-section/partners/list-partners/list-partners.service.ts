import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
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
  private partnersSource: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>([]);
  private partners$: Observable<Partner[]> = this.partnersSource.asObservable();

  private setPartners(): void {
    if(this.partnersSource.getValue().length === 0) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
      this.http.get<Partner[]>(this.urlBase, this.httpOptions).pipe(
        map((partners: Partner[]) => {
          this.partnersSource.next(partners);
        }),
        catchError((err: HttpErrorResponse) => {
          if(err.status === 401 || err.status === 403) {
            return of<Partner[]>([]);
          }
          
          return throwError(() => err);
        })
      )
      .subscribe();
    }
  }

  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'Socios/';
    this.setPartners();
  }

  addPartner(partner: Partner) {
    this.partnersSource.next([...this.partnersSource.getValue(), partner])
  }

  get partners(): Observable<Partner[]> {
    return this.partners$;
  }

  getPartner(id: number): Observable<Partner | undefined> {
    return this.partners$.pipe(
      switchMap((partners: Partner[]) => {
        if(partners.length !== 0) {
          let partner: Partner | undefined = partners.find(partner => partner.id_user === id);
          if(partner) {
            return of(partner);
          }
          else {
            throw new Error('No existe el socio');
          }
        }
        return of(undefined);
      })
    );
  }

  getFirstPartner(): Observable<Partner> {
    return this.partners$.pipe(
      switchMap((partners: Partner[]) => of(partners[0]))
    )
  }

  registerPartner(registerPartnerData: PartnerRegister): Observable<Partner | null> {
    return this.http.post<Partner | null>(this.urlBase, registerPartnerData, this.httpOptions);
  }
}
