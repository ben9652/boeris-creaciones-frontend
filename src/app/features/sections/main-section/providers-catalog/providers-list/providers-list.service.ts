import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Provider } from '../../../../../core/models/provider.entities';

@Injectable({
  providedIn: 'root'
})
export class ProvidersListService {
  urlBase: string;
  httpOptions?: HttpOptions;

  providers: WritableSignal<Provider[] | null> = signal<Provider[] | null>(null);
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProveedores';
  }

  addProvider(provider: Provider) {
    this.providers()?.push(provider);
  }

  getProvidersFromDatabase(): Observable<Provider[]> {
    const providers: Provider[] | null = this.providers();

    if(!providers) {
      this.httpOptions = new HttpOptions(this.authService.getToken());
      return this.http.get<Provider[]>(this.urlBase, this.httpOptions);
    }
    else {
      return of(providers);
    }
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
