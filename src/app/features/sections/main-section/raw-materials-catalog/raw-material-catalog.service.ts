import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RawMaterial } from '../../../../core/models/rawMaterial.entities';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { signal } from '@angular/core'
import { Category } from '../../../../core/models/category.entities';
import { Unit } from '../../../../core/models/rawMaterial.entities';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialCatalogService {

  httpOptions?: HttpOptions;
  urlBase: string = '';

  selectedRawMaterial = signal<RawMaterial | null>(null);
  nextId = signal<number>(0);
  disableDataEdition = signal<boolean>(true);
  mode = signal<string | null>(null);
  refreshNeeded = signal<boolean>(false);

  constructor(private authService: AuthService, private http: HttpClient) { }

  getRefreshNeeded() {
    return this.refreshNeeded;
  }

  triggerRefresh() {
    console.log("TRIGGEREA EL REFRESCO");
    this.refreshNeeded.set(true);
  }

  resetRefresh() {
    console.log("RESETEO EL REFRESCO");
    this.refreshNeeded.set(false);
  }

  selectRawMaterial(raw: RawMaterial) {
    this.selectedRawMaterial.set(raw);
    console.log(this.selectedRawMaterial());
  }

  calculateNextId(id: number){
    this.nextId.set(id + 1);
  }

  createNewSelectedRawMaterial() {
    const newRawMaterial: RawMaterial = {
      id: this.nextId(),
      category: null,
      unit: null,
      name: null,
      source: null,
      stock: 0,
      picture: 'pictures/leaf-solid.svg',
      comment: null,
    };
    this.selectedRawMaterial.set(newRawMaterial);
    this.mode.set('new');
    this.toggleEdition(false);
  }

  updateSelectedRawMaterial(property: keyof RawMaterial, value: any) {
    const currentRawMaterial = this.selectedRawMaterial();
    if (currentRawMaterial) {
      this.selectedRawMaterial.set({ ...currentRawMaterial, [property]: value });
    }
  }

  toggleEdition(change: boolean) {
    this.disableDataEdition.set(change);
  }

  getRawMaterialsList(): Observable<RawMaterial[]> {
    this.httpOptions = new HttpOptions(this.authService.getToken());
    return this.http.get<RawMaterial[]>(this.urlBase + environment.API_URL + 'CatalogoMateriasPrimas', this.httpOptions);
  }

  getCategorys(): Observable<Category[]> {
    this.httpOptions = new HttpOptions(this.authService.getToken());
    return this.http.get<Category[]>(this.urlBase + environment.API_URL + 'RubrosMateriasPrimas', this.httpOptions);
  }

  async getUnits(): Promise<Unit[]> {
    const data = await fetch(this.urlBase + environment.API_URL + 'Unidades/');
    return await data.json() ?? [];
  }

  addNewRawMaterial(): Observable<RawMaterial> {
    const newRawMaterial = this.selectedRawMaterial();
    if(this.selectedRawMaterial()?.name && this.selectedRawMaterial()?.category && this.selectedRawMaterial()?.source && this.selectedRawMaterial()?.unit){
      return this.http.post<RawMaterial>(this.urlBase + environment.API_URL + 'CatalogoMateriasPrimas', newRawMaterial, this.httpOptions);
    } else {
      return throwError(() => new Error('Debe completar todos los campos obligatorios'));
    }
  }
}
