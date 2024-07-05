import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Partner, PartnerRegister } from '../../../../../core/models/partner.entities';

@Injectable({
  providedIn: 'root'
})
export class ListPartnersService {
  urlBase: string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.urlBase = environment.API_URL + 'Socios/'
  }

  getPartners(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }),
      responseType: 'json'
    };
    return this.http.get<Partner[]>(this.urlBase, this.httpOptions);
  }

  registerPartner(registerPartnerData: PartnerRegister): Observable<any> {
    return this.http.post<Partner | null>(this.urlBase, registerPartnerData, this.httpOptions);
  }
}
