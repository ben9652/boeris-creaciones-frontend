import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../../core/models/httpOptions.entities';
import { RawMaterial } from '../../../../../core/models/rawMaterial.entities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { DataAccessService } from '../../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialsListService {
  urlBase: string;
  httpOptions?: HttpOptions;

  rawMaterials: WritableSignal<RawMaterial[] | null> = signal<RawMaterial[] | null>(null);

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoMateriasPrimas';
  }

  addRawMaterial(rawMaterial: RawMaterial) {
    this.rawMaterials()?.push(rawMaterial);
  }

  editRawMaterial(id: number, rawMaterial: RawMaterial) {
    const index: number | undefined = this.rawMaterials()?.findIndex(rm => rm.id === id);

    if(index !== undefined && index !== -1) {
      const rawMaterials: RawMaterial[] | null = this.rawMaterials();
      if(rawMaterials)
        rawMaterials[index] = { ...rawMaterial };
    }
  }

  getRawMaterialsFromDatabase(): Observable<RawMaterial[]> {
    const rawMaterials: RawMaterial[] | null = this.rawMaterials();

    if(!rawMaterials) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
      return this.http.get<RawMaterial[]>(this.urlBase, this.httpOptions);
    }
    
    else return of(rawMaterials);
  }

  getRawMaterial(id: number): RawMaterial | undefined {
    if(this.rawMaterials()?.length !== 0) {
      let rawMaterial: RawMaterial | undefined = this.rawMaterials()?.find(rawMaterial => rawMaterial.id === id);
      if(rawMaterial)
        return rawMaterial;
      else
        return undefined;
    }

    return undefined;
  }

  registerRawMaterial(rawMaterial: RawMaterial): Observable<RawMaterial> {
    return this.http.post<RawMaterial>(this.urlBase, rawMaterial, this.httpOptions);
  }
}
