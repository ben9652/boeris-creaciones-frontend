import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { areProvidersEqual, Provider } from '../../../../core/models/provider.entities';
import { PatchObject } from '../../../../core/models/patchObj.entities';
import { Observable, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidersCatalogService {
  urlBase: string;
  httpOptions?: HttpOptions;

  // Si hay un proveedor seleccionado, este tendrá un ID correspondiente al ID del proveedor
  // Si aún no se seleccionó nada, es nulo
  // Si su ID es 0, es porque se está agregando un proveedor nuevo
  selectedProvider: WritableSignal<Provider | null> = signal<Provider | null>(null);
  selectedNonModifiedProvider: Provider | null = null;

  nonModified: boolean = true;

  providerUpdated: boolean = false;

  patchData: PatchObject[] = [];
  
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private translateService: TranslateService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoProveedores';
    this.httpOptions = new HttpOptions(authService.getToken());
  }

  updateSelectedProvider(property: keyof Provider, value: any) {
    const currentProvider: Provider | null = this.selectedProvider();
    if(currentProvider) {
      this.selectedProvider.set({ ...currentProvider, [property]: value });
      this.nonModified = areProvidersEqual(this.selectedNonModifiedProvider, this.selectedProvider());
    }
  }

  addNewProvider(): Observable<Provider> {
    let newProvider: Provider | null = this.selectedProvider();
    const apiUrl: string = this.urlBase;
    
    if(this.httpOptions === undefined)
      this.httpOptions = new HttpOptions(this.authService.getToken());

    if(this.selectedProvider()?.name === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.ERRORS.FIELD_NAME_LACK')));

    if(this.selectedProvider()?.category === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.CATEGORY_MODAL.WARNINGS.MUST_SELECT_CATEGORY')));

    if(this.selectedProvider()?.name && this.selectedProvider()?.category) {
      return this.http.post<Provider>(apiUrl, newProvider, this.httpOptions);
    }
    else {
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.ERRORS.FIELDS_LACK')));
    }
  }

  editProvider(id: number): Observable<Provider> {
    const apiUrl: string = this.urlBase;
    const apiUrlWithId: string = apiUrl + `/${id}`;

    if(this.patchData.find(patch => patch.path === 'name')?.value === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.ERRORS.FIELD_NAME_LACK')));

    if(this.patchData.find(patch => patch.path === 'category')?.value === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.CATEGORY_MODAL.WARNINGS.MUST_SELECT_CATEGORY')));

    return this.http.patch<Provider>(apiUrlWithId, this.patchData, this.httpOptions);
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
