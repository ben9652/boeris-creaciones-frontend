import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { areRawMaterialsEqual, RawMaterial } from '../../../../core/models/rawMaterial.entities';
import { PatchObject } from '../../../../core/models/patchObj.entities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { getImageFileFromUrl } from '../../../../shared/multimedia.helpers';
import { DataAccessService } from '../../../../core/services/data-access/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialsCatalogService {
  urlBase: string;
  httpOptions?: HttpOptions;

  // Si hay una materia prima seleccionada, esta tendrá un ID correspondiente al ID de la materia prima
  // Si aún no se seleccionó nada, es nulo
  // Si su ID es 0, es porque se está agregando una materia prima nueva
  selectedRawMaterial: WritableSignal<RawMaterial | null> = signal<RawMaterial | null>(null);
  selectedNonModifiedRawMaterial: RawMaterial | null = null;

  nonModified: boolean = true;

  rawMaterialUpdated: boolean = false;

  patchData: PatchObject[] = [];

  constructor(
    private dataAccessService: DataAccessService,
    private http: HttpClient,
    private translateService: TranslateService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoMateriasPrimas';
    this.httpOptions = new HttpOptions(dataAccessService.getToken());
  }

  updateSelectedRawMaterial(property: keyof RawMaterial, value: any) {
    const currentRawMaterial: RawMaterial | null = this.selectedRawMaterial();
    if(currentRawMaterial) {
      this.selectedRawMaterial.set({ ...currentRawMaterial, [property]: value });
      this.nonModified = areRawMaterialsEqual(this.selectedNonModifiedRawMaterial, this.selectedRawMaterial());
    }
  }

  addNewRawMaterial(): Observable<RawMaterial> {
    let newRawMaterial: RawMaterial | null = this.selectedRawMaterial();
    const apiUrl: string = this.urlBase;
    const apiUrlToSavePicture: string = apiUrl + '/upload-image';

    if(this.httpOptions === undefined) {
      this.httpOptions = new HttpOptions(this.dataAccessService.getToken());
    }

    if(this.selectedRawMaterial()?.name === null) {
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELD_NAME_LACK')));
    }

    if(this.selectedRawMaterial()?.category === null) {
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.CATEGORY_MODAL.WARNINGS.MUST_SELECT_CATEGORY')));
    }

    if(this.selectedRawMaterial()?.name && this.selectedRawMaterial()?.category) {
      if(newRawMaterial?.picture !== 'pictures/leaf-solid.svg') {
        return getImageFileFromUrl(newRawMaterial?.picture).pipe(
          switchMap((file: File | undefined) => {
            const formData: FormData = new FormData();
            if(file) {
              formData.append('file', file);
            }

            const httpOptionsToCreateImage: HttpOptions = new HttpOptions(this.dataAccessService.getToken(), true);
            return this.http.post<string>(apiUrlToSavePicture, formData, httpOptionsToCreateImage).pipe(
              switchMap((newPictureUrl: string) => {
                if(newRawMaterial !== null) {
                  newRawMaterial.picture = newPictureUrl;
                }
                return this.http.post<RawMaterial>(apiUrl, newRawMaterial, this.httpOptions);
              })
            )
          })
        )
      }
      else {
        return this.http.post<RawMaterial>(apiUrl, newRawMaterial, this.httpOptions);
      }
    }
    else {
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK')));
    }
  }

  editRawMaterial(id: number): Observable<RawMaterial> {
    const apiUrl: string = this.urlBase;
    const apiUrlWithId: string = apiUrl + `/${id}`;
    if(this.patchData.find(patch => patch.path === 'name')?.value === '') {
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELD_NAME_LACK')));
    }

    let picturePatch: PatchObject | undefined = this.patchData.find(patch => patch.path === 'picture');
    const apiUrlToSavePicture: string = apiUrl + '/upload-image';

    const tokens: string[] | undefined = this.selectedNonModifiedRawMaterial?.picture?.split('/');
    let apiUrlToDeletePicture: string = apiUrl + '/delete-image/';
    if(tokens) {
      const pictureName: string = tokens[tokens.length - 1];
      apiUrlToDeletePicture += pictureName;
    }

    if(picturePatch?.value) {
      return getImageFileFromUrl(picturePatch.value).pipe(
        switchMap((file: File | undefined) => {
          const formData: FormData = new FormData();
          if(file) {
            formData.append('file', file);
          }
          
          const httpOptionsForImageManaging: HttpOptions = new HttpOptions(this.dataAccessService.getToken(), true);
          return this.http.delete<boolean>(apiUrlToDeletePicture, httpOptionsForImageManaging).pipe(
            switchMap((deletedImage: boolean) => {
              return this.http.post<string>(apiUrlToSavePicture, formData, httpOptionsForImageManaging).pipe(
                switchMap((imageUrl: string) => {
                  picturePatch.value = imageUrl;
                  return this.http.patch<RawMaterial>(apiUrlWithId, this.patchData, this.httpOptions);
                }),
                catchError((res) => {
                  console.log('No se pudo agregar una imagen: ', res);
                  return of();
                })
              )
            }),
            catchError((res) => {
              console.log('No se pudo eliminar la imagen anterior: ', res);
              return of();
            })
          )
        })
      )
    }
    else {
      return this.http.patch<RawMaterial>(apiUrlWithId, this.patchData, this.httpOptions);
    }
  }

  addPatchObject(op: string, path: string, value: any) {
    const alreadyAddedPatch: PatchObject | undefined = this.patchData.find(patch => patch.path === path);
    const isNotNull: boolean = value !== null && value !== undefined;

    if(alreadyAddedPatch && !isNotNull) {
      const index: number = this.patchData.indexOf(alreadyAddedPatch);
      this.patchData.splice(index, 1);
      return;
    }

    if(alreadyAddedPatch && isNotNull)
      alreadyAddedPatch.value = value;
    else
      this.patchData.push(new PatchObject(op, path, value));
  }
}
