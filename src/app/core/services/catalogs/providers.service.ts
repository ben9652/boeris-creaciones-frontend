import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../models/httpOptions.entities';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { SelectItemGroup } from 'primeng/api';
import { DataAccessService } from '../data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  urlBase: string;
  httpOptions?: HttpOptions;

  providers: WritableSignal<SelectItemGroup[] | null> = signal<SelectItemGroup[] | null>(null);

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProveedores/Dropdown';
  }

  getProvidersFromDatabase(categoriesIds: number[]): Observable<SelectItemGroup[]> {
    const providers: SelectItemGroup[] | null = this.providers();

    if(!providers) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());

      if (categoriesIds.length > 0) {
        const url = this.urlBase + '/' + categoriesIds.join('-');
        return this.http.get<SelectItemGroup[]>(url, this.httpOptions);
      }
      
      return this.http.get<SelectItemGroup[]>(this.urlBase, this.httpOptions);
    }
    
    else return of(providers);
  }
}
