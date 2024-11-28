import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../models/httpOptions.entities';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { SelectItemGroup } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  urlBase: string;
  httpOptions?: HttpOptions;

  providers: WritableSignal<SelectItemGroup[] | null> = signal<SelectItemGroup[] | null>(null);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProveedores/Dropdown';
  }

  getProvidersFromDatabase(): Observable<SelectItemGroup[]> {
    const providers: SelectItemGroup[] | null = this.providers();

    if(!providers) {
      this.httpOptions = new HttpOptions(this.authService.getToken());
      return this.http.get<SelectItemGroup[]>(this.urlBase, this.httpOptions);
    }
    
    else return of(providers);
  }
}
