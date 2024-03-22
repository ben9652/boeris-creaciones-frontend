import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMessage } from 'src/app/models/mensajeAPI.entities';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ListRawMaterialsService {
  urlBase: string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
  ) {
    this.urlBase = environment.API_KEY + 'MateriasPrimas/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '86400',
        'x-cache': 'true'
      }),
      responseType: 'json'
    };
  }

  getRawMaterials(): Observable<ApiMessage> {
    const apiUrl = this.urlBase + 'Listar';
    return this.http.get<ApiMessage>(apiUrl);
  }
}
