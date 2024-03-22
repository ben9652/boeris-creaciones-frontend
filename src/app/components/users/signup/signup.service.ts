import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioRegistro } from 'src/app/components/users/usuarios.entities';
import { EnvService } from 'src/app/services/env.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  urlBase: string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
  ) {
    this.urlBase = environment.API_KEY + 'Usuarios/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true'
      }),
      responseType: 'json'
    };
  }

  registerClient(user: UsuarioRegistro): Observable<any> {
    const apiUrl = this.urlBase + 'Registrar';
    return this.http.post<any>(apiUrl, user, this.httpOptions);
  }
}
