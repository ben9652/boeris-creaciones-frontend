import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Partner, PartnerRegister } from '../../../../../core/models/partner.entities';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';

@Injectable({
  providedIn: 'root'
})
export class ListPartnersService {
  urlBase: string;
  httpOptions?: HttpOptions;

  // Observable para los socios existentes
  private partnersSource: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>([]);
  private partners$: Observable<Partner[]> = this.partnersSource.asObservable();

  private setPartners(): void {
    this.httpOptions = new HttpOptions(this.authService.getToken());
    if(this.partnersSource.getValue().length === 0) {
      this.http.get<Partner[]>(this.urlBase, this.httpOptions).subscribe((partners: Partner[]) => {
        this.partnersSource.next(partners);
      })
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
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
