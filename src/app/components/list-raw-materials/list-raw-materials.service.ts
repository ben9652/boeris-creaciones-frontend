import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/services/env.service';
import { RawMaterial } from './card-raw-material/raw-material.entities';
import { ApiMessage } from 'src/app/models/mensajeAPI.entities';

@Injectable({
  providedIn: 'root'
})
export class ListRawMaterialsService {
  urlBase: string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) {
    this.urlBase = env.apiUrlBase + 'MateriasPrimas/';
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
