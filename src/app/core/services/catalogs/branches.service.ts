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
export class BranchesService {
  urlBase: string;
  httpOptions?: HttpOptions;

  branches: WritableSignal<SelectItemGroup[] | null> = signal<SelectItemGroup[] | null>(null);

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoSucursales/Dropdown';
  }

  getBranchesFromDatabase(): Observable<SelectItemGroup[]> {
    const branches: SelectItemGroup[] | null = this.branches();

    if(!branches) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
      return this.http.get<SelectItemGroup[]>(this.urlBase, this.httpOptions);
    }
    
    else return of(branches);
  }
}
