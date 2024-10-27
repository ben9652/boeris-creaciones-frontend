import { Injectable } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Unit } from '../../../../core/models/rawMaterial.entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  urlBase: string;
  httpOptions?: HttpOptions;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'Unidades';
  }

  get(): Observable<Unit[]> {
    const apiUrl: string = this.urlBase;
    this.httpOptions = new HttpOptions(this.authService.getToken());
    return this.http.get<Unit[]>(apiUrl, this.httpOptions);
  }
}
