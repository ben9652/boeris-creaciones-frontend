import { Injectable } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Unit } from '../../../../core/models/rawMaterial.entities';
import { Observable } from 'rxjs';
import { DataAccessService } from '../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  urlBase: string;
  httpOptions?: HttpOptions;

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'Unidades';
  }

  get(): Observable<Unit[]> {
    const apiUrl: string = this.urlBase;
    this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    return this.http.get<Unit[]>(apiUrl, this.httpOptions);
  }
}
