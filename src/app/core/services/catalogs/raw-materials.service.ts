import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../../models/httpOptions.entities';
import { AuthService } from '../auth/auth.service';
import { SelectItemGroup } from 'primeng/api';
import { DataAccessService } from '../data-access/data-access.service';
import { RawMaterial } from '../../models/rawMaterial.entities';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialsService {
  urlBase: string;
  httpOptions?: HttpOptions;

  rawMaterials: WritableSignal<SelectItemGroup<RawMaterial>[] | null> = signal<SelectItemGroup<RawMaterial>[] | null>(null);

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoMateriasPrimas/Dropdown';
  }

  getRawMaterialsFromDatabase(categoriesIds: number[], download: boolean): Observable<SelectItemGroup[]> {
    const rawMaterials: SelectItemGroup[] | null = this.rawMaterials();
    
    // Se tienen que descargar las materias primas para el dropdown
    if(!rawMaterials || (rawMaterials && download)) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());

      if (categoriesIds.length > 0) {
        const url = this.urlBase + '/' + categoriesIds.join('-');
        return this.http.get<SelectItemGroup[]>(url, this.httpOptions);
      }
      
      return this.http.get<SelectItemGroup[]>(this.urlBase, this.httpOptions);
    }
    
    // No es necesario descargar las materias primas para el dropdown
    else return of(rawMaterials);
  }
}
