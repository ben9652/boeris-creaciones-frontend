import { effect, Injectable, model, signal, ModelSignal, WritableSignal } from '@angular/core';
import { catchError, defer, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { areRawMaterialsEqual, RawMaterial } from '../../../../core/models/rawMaterial.entities';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Category } from '../../../../core/models/category.entities';
import { Unit } from '../../../../core/models/rawMaterial.entities';
import { PatchObject } from '../../../../core/models/patchObj.entities';
import { RawMaterialRow } from './raw-material-list/raw-material-list.entities';
import { getImageFileFromUrl } from '../../../../shared/multimedia.helpers';

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

  nonModified: WritableSignal<boolean> = signal<boolean>(true);

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
    this.nonModified.set(areRawMaterialsEqual(this.previousRawMaterial, this.selectedRawMaterial()));
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
      this.nonModified.set(areRawMaterialsEqual(this.previousRawMaterial, this.selectedRawMaterial()));
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

  getCategories(): Observable<Category[]> {
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
    let newRawMaterial: RawMaterial | null = this.selectedRawMaterial();
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas';
    const apiUrlToSavePicture: string = apiUrl + '/upload-image';
    
    if(this.selectedRawMaterial()?.name && this.selectedRawMaterial()?.category && this.selectedRawMaterial()?.source && this.selectedRawMaterial()?.unit) {
      if(newRawMaterial?.picture !== 'pictures/leaf-solid.svg') {
        return getImageFileFromUrl(newRawMaterial?.picture).pipe(
          switchMap((file: File | undefined) => {
            const formData = new FormData();
            if(file) {
              formData.append('file', file);
            }

            const httpOptionsToCreateImage: HttpOptions = new HttpOptions(this.authService.getToken(), true);
            return this.http.post<string>(apiUrlToSavePicture, formData, httpOptionsToCreateImage).pipe(
              switchMap((newPictureUrl: string) => {
                if(newRawMaterial !== null) {
                  newRawMaterial.picture = newPictureUrl;
                }
                return this.http.post<RawMaterial>(apiUrl, newRawMaterial, this.httpOptions);
              })
            );
          })
        )
      }
      else {
        return this.http.post<RawMaterial>(apiUrl, newRawMaterial, this.httpOptions);
      }
    } else {
      return throwError(() => new Error('Debe completar todos los campos obligatorios'));
    }
  }

  addPatchObject(op: string, path: string, value: any) {
    const alreadyAddedPatch: PatchObject | undefined = this.patchData.find(patch => patch.path === path);
    if(alreadyAddedPatch) {
      alreadyAddedPatch.value = value;
    } else {
      this.patchData.push(new PatchObject(op, path, value));
    }
  }

  editRawMaterial(id: number, patchObj: PatchObject[]): Observable<RawMaterial> {
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas';
    const apiUrlWithId = this.urlBase + 'CatalogoMateriasPrimas/' + id;
    if((patchObj.find(patch => patch.path === '/name')?.value) === "") {
      return throwError(() => new Error('El nombre no puede ser vacío'));
    }

    let picturePatch: PatchObject | undefined = patchObj.find(patch => patch.path === '/picture');
    const apiUrlToSavePicture: string = apiUrl + '/upload-image';

    const tokens: string[] | undefined = this.previousRawMaterial?.picture?.split('/');
    let apiUrlToDeletePicture: string = apiUrl + '/delete-image/';
    if(tokens) {
      const pictureName: string = tokens[tokens.length - 1];
      apiUrlToDeletePicture += pictureName;
    }

    if(picturePatch?.value) {
      return getImageFileFromUrl(picturePatch.value).pipe(
        switchMap((file: File | undefined) => {
          const formData = new FormData();
          if(file) {
            formData.append('file', file);
          }
          
          return this.http.delete<boolean>(apiUrlToDeletePicture, this.httpOptions).pipe(
            switchMap((deletedImage: boolean) => {
              const httpOptionsToCreateImage: HttpOptions = new HttpOptions(this.authService.getToken(), true);
              return this.http.post<string>(apiUrlToSavePicture, formData, httpOptionsToCreateImage).pipe(
                switchMap((imageUrl: string) => {
                  picturePatch.value = imageUrl;
                  return this.http.patch<RawMaterial>(apiUrlWithId, patchObj, this.httpOptions);
                }),
                catchError((res) => {
                  console.log(res);
                  return of();
                })
              )
            })
          )
        })
      )
    }
    else {
      return this.http.patch<RawMaterial>(apiUrlWithId, patchObj, this.httpOptions);
    }
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
    const patchObj: PatchObject[] = [
      new PatchObject("replace", "name", newCategoryName)
    ];
    return this.http.patch<Category>(apiUrl, patchObj, this.httpOptions);
  }
  
  uploadImage(formData: FormData) {
    const apiUrl = this.urlBase + 'CatalogoMateriasPrimas/' + 'upload-image';
    this.http.post(apiUrl, formData, this.httpOptions);
  }
}
