import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../../models/httpOptions.entities';
import { AuthService } from '../auth/auth.service';
import { SelectItemGroup } from 'primeng/api';
import { DataAccessService } from '../data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialsService {
  urlBase: string;
  httpOptions?: HttpOptions;

  rawMaterials: WritableSignal<SelectItemGroup[] | null> = signal<SelectItemGroup[] | null>(null);

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoMateriasPrimas/Dropdown';
  }

  getRawMaterialsFromDatabase(): Observable<SelectItemGroup[]> {
    const rawMaterials: SelectItemGroup[] | null = this.rawMaterials();

    if(!rawMaterials) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
      return this.http.get<SelectItemGroup[]>(this.urlBase, this.httpOptions);
    }
    
    else return of(rawMaterials);
  }
}
