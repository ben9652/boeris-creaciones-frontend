import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Provider } from '../../../../../core/models/provider.entities';
import { DataAccessService } from '../../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersListService {
  urlBase: string;
  httpOptions?: HttpOptions;

  providers: WritableSignal<Provider[] | null> = signal<Provider[] | null>(null);
  
  constructor(
    private http: HttpClient,
    private dataAccessService: DataAccessService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProveedores';
  }

  addProvider(provider: Provider) {
    this.providers()?.push(provider);
  }

  editProvider(id: number, provider: Provider) {
    const index: number | undefined = this.providers()?.findIndex(p => p.id === id);

    if(index !== undefined && index !== -1) {
      const providers: Provider[] | null = this.providers();
      if(providers)
        providers[index] = { ...provider };
    }
  }

  getProvidersFromDatabase(): Observable<Provider[]> {
    const providers: Provider[] | null = this.providers();

    if(!providers) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
      return this.http.get<Provider[]>(this.urlBase, this.httpOptions);
    }

    return of(providers);
  }

  getProvider(id: number): Provider | undefined {
    if(this.providers()?.length !== 0) {
      let provider: Provider | undefined = this.providers()?.find(provider => provider.id === id);
      if(provider)
        return provider;
      else
        return undefined;
    }
    return undefined;
  }

  registerProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(this.urlBase, provider, this.httpOptions);
  }
}
