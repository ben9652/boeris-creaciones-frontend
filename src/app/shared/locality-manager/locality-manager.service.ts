import { Injectable } from '@angular/core';
import { HttpOptions } from '../../core/models/httpOptions.entities';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PatchObject } from '../../core/models/patchObj.entities';
import { Locality } from '../../core/models/locality.entities';
import { DataAccessService } from '../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class LocalityManagerService {
  urlBase: string;
  httpOptions?: HttpOptions;

  constructor(
    public translateService: TranslateService,
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'Localidades';
    this.httpOptions = new HttpOptions(dataAccessService.getToken());
  }

  getLocalities(): Observable<Locality[]> {
    this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    const apiUrl: string = this.urlBase;
    return this.http.get<Locality[]>(apiUrl, this.httpOptions);
  }

  create(newLocality: Locality): Observable<Locality> {
    const apiUrl: string = this.urlBase;
    return this.http.post<Locality>(apiUrl, newLocality, this.httpOptions);
  }

  edit(localityId: number, newLocalityName: string): Observable<Locality> {
    const apiUrl: string = this.urlBase + `/${localityId}`;
    const patchObj: PatchObject[] = [
      new PatchObject('replace', 'name', newLocalityName)
    ];

    return this.http.patch<Locality>(apiUrl, patchObj, this.httpOptions);
  }
}
