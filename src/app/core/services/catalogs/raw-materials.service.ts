import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../../models/httpOptions.entities';
import { RawMaterial } from '../../models/rawMaterial.entities';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialsService {
  urlBase: string;
  httpOptions?: HttpOptions;

  rawMaterials: WritableSignal<RawMaterial[] | null> = signal<RawMaterial[] | null>(null);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL + 'CatalogoMateriasPrimas';
  }

  getRawMaterialsFromDatabase(): Observable<RawMaterial[]> {
    const rawMaterials: RawMaterial[] | null = this.rawMaterials();

    if(!rawMaterials) {
      this.httpOptions = new HttpOptions(this.authService.getToken());
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
}
