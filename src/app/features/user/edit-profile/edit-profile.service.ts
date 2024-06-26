import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { PatchObject } from '../../../core/models/patchObj.entities';
import { ApiMessage } from '../../../core/models/apimessage.entities';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  urlBase: string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.urlBase = environment.API_URL + 'Usuarios/';
    afterRender(() => {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Max-Age': '86400',
          'x-cache': 'true',
          'Authorization': `Bearer ${authService.getToken()}`
        }),
        responseType: 'json'
      };
    });
  }

  checkPassword(id: number, password: string): Observable<any> {
    password.replace(' ', '+');
    console.log(this.httpOptions.headers)
    const apiUrl: string = this.urlBase + 'ComprobarPassword?' + `id=${id}` + `&password=${password}`;
    return this.http.get<boolean>(apiUrl, this.httpOptions);
  }

  updateUser(id: number, attribsToChange: PatchObject[]): Observable<any> {
    const apiUrl: string = this.urlBase + `${id}`;
    return this.http.patch<ApiMessage>(apiUrl, attribsToChange, this.httpOptions);
  }
}
