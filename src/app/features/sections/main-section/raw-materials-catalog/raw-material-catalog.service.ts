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
import { PatchObject } from '../../../../core/models/patchObj.entities';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialCatalogService {

  isMobile = signal<boolean>(false);

  httpOptions?: HttpOptions;
  urlBase: string = '';

  selectedRawMaterial = signal<RawMaterial | null>(null);
  nextId = signal<number>(0);
  disableDataEdition = signal<boolean>(true);
  mode = signal<string | null>(null);
  refreshNeeded = signal<boolean>(false);
  patchData: PatchObject[] = [];

  modalVisibility = false;
  modalTitle = "";

  constructor(private authService: AuthService, private http: HttpClient) { }

  getRefreshNeeded() {
    return this.refreshNeeded;
  }

  triggerRefresh() {
    this.refreshNeeded.set(true);
  }

  resetRefresh() {
    this.refreshNeeded.set(false);
  }

  selectRawMaterial(raw: RawMaterial) {
    this.selectedRawMaterial.set(raw);
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

  addPatchObject(op: string, path: string, value: any) {
    const allreadyPatch = this.patchData.find(patch => patch.path === path);
    if(allreadyPatch){
      allreadyPatch.value = value;
    } else {
      this.patchData.push(new PatchObject(op, path, value));
    }
  }

  editRawMaterial(id: number, patchObj: PatchObject[]): Observable<RawMaterial> {
    if((patchObj.find(patch => patch.path === '/name')?.value) !== ""){
      return this.http.patch<RawMaterial>(this.urlBase + environment.API_URL + 'CatalogoMateriasPrimas/' + id, patchObj, this.httpOptions);
    }
    return throwError(() => new Error('El nombre no puede ser vacio'));
  }

  createCategory(newCategory: Category): Observable<Category> {
    this.modalVisibility = false;
    if(newCategory.name == "" || null || undefined){
      return throwError(() => new Error('El nombre del rubro no puede ser vacio'));
    } else {
      return this.http.post<Category>(this.urlBase + environment.API_URL + 'RubrosMateriasPrimas', newCategory, this.httpOptions);
    }
  }

  editCategory(categoryId: number, newCategoryName: string): Observable<Category> {
    return this.http.patch<Category>(this.urlBase + environment.API_URL + 'RubrosMateriasPrimas/' + categoryId, [{ "op": "replace", "path": "/name", "value": newCategoryName }], this.httpOptions);
  }
  
}
