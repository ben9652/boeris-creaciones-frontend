import { effect, Injectable, model, ModelSignal } from '@angular/core';
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
import { RawMaterialRow } from './raw-material-list/raw-material-list.entities';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialCatalogService {

  isMobile = signal<boolean>(false);

  httpOptions?: HttpOptions;
  urlBase: string;

  previousRawMaterial: RawMaterial | null = null;
  selectedRawMaterial = signal<RawMaterial | null>(null);

  nextId = signal<number>(0);
  disableDataEdition = signal<boolean>(true);
  mode = signal<string | null>(null);
  refreshNeeded = signal<boolean>(false);
  patchData: PatchObject[] = [];

  modalVisibility = false;
  modalTitle = "";

  constructor(private authService: AuthService, private http: HttpClient) {
    this.urlBase = environment.API_URL;
  }

  getRefreshNeeded() {
    return this.refreshNeeded;
  }

  triggerRefresh() {
    this.refreshNeeded.set(true);
  }

  resetRefresh() {
    this.refreshNeeded.set(false);
  }

  selectRawMaterial(rawMaterial: RawMaterialRow) {
    // Hago copias completas de los objetos para pasarlos a estos otros objetos que quiero que adquieran sus mismos valores
    // Si asigno directamente los objetos estaré asignando referencias de rawMaterial.nonModified y rawMaterial.modified, y solo
    // quiero copias completas porque sino ocurren cosas raras.
    const clonedNonModifiedRawMaterial: RawMaterial | null = structuredClone(rawMaterial.nonModified);
    const clonedModifiedRawMaterial: RawMaterial | null = structuredClone(rawMaterial.modified);
    this.previousRawMaterial = clonedNonModifiedRawMaterial;
    this.selectedRawMaterial.set(clonedModifiedRawMaterial);
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
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas';
    return this.http.get<RawMaterial[]>(apiUrl, this.httpOptions);
  }

  getCategorys(): Observable<Category[]> {
    this.httpOptions = new HttpOptions(this.authService.getToken());
    const apiUrl = this.urlBase + 'RubrosMateriasPrimas';
    return this.http.get<Category[]>(apiUrl, this.httpOptions);
  }

  async getUnits(): Promise<Unit[]> {
    const apiUrl = this.urlBase + 'Unidades';
    const data = await fetch(apiUrl);
    return await data.json() ?? [];
  }

  addNewRawMaterial(): Observable<RawMaterial> {
    const newRawMaterial = this.selectedRawMaterial();
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas';
    if(this.selectedRawMaterial()?.name && this.selectedRawMaterial()?.category && this.selectedRawMaterial()?.source && this.selectedRawMaterial()?.unit){
      return this.http.post<RawMaterial>(apiUrl, newRawMaterial, this.httpOptions);
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
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas/' + id;
    if((patchObj.find(patch => patch.path === '/name')?.value) !== ""){
      return this.http.patch<RawMaterial>(apiUrl, patchObj, this.httpOptions);
    }
    return throwError(() => new Error('El nombre no puede ser vacío'));
  }

  createCategory(newCategory: Category): Observable<Category> {
    this.modalVisibility = false;
    const apiUrl = this.urlBase + 'RubrosMateriasPrimas';
    if(newCategory.name == "" || null || undefined){
      return throwError(() => new Error('El nombre del rubro no puede ser vacío'));
    } else {
      return this.http.post<Category>(apiUrl, newCategory, this.httpOptions);
    }
  }

  editCategory(categoryId: number, newCategoryName: string): Observable<Category> {
    const apiUrl = this.urlBase + 'RubrosMateriasPrimas/' + categoryId;
    const patchObj = new PatchObject("replace", "name", newCategoryName);
    return this.http.patch<Category>(this.urlBase + environment.API_URL + 'RubrosMateriasPrimas/' + categoryId, patchObj, this.httpOptions);
  }
  
  uploadImage(formData: FormData) {
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas/' + 'upload-image';
    this.http.post(apiUrl, formData, this.httpOptions);
  }
}
