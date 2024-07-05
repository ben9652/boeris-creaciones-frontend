import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { PartnerType } from '../../../../../core/models/partner.entities';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  urlBase: string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.urlBase = environment.API_URL + 'RolesSocios/';
  }

  getPartnersRoles(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }),
      responseType: 'json'
    };
    return this.http.get<PartnerType[]>(this.urlBase, this.httpOptions);
  }

  assignRolesToPartner(id: number, roles: number[]) {
    const apiUrl: string = this.urlBase + id;
    console.log(apiUrl)
    return this.http.put(apiUrl, roles, this.httpOptions);
  }
}
