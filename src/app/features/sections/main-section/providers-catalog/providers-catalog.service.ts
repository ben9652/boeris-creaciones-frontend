import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { areProvidersEqual, Provider } from '../../../../core/models/provider.entities';
import { PatchObject } from '../../../../core/models/patchObj.entities';
import { Observable, throwError } from 'rxjs';

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
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL;
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
    const apiUrl: string = this.urlBase + 'CatalogoProveedores';
    
    if(this.httpOptions === undefined)
      this.httpOptions = new HttpOptions(this.authService.getToken());

    if(this.selectedProvider()?.name === null)
      return throwError(() => new Error('Debe llenarse el campo de nombre'));

    if(this.selectedProvider()?.category === null)
      return throwError(() => new Error('Se debe seleccionar un rubro'));

    if(this.selectedProvider()?.name && this.selectedProvider()?.category) {
      return this.http.post<Provider>(apiUrl, newProvider, this.httpOptions);
    }
    else {
      return throwError(() => new Error('Debe completar todos los campos obligatorios'));
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

  editProvider(id: number): Observable<Provider> {
    const apiUrl: string = this.urlBase + 'CatalogoProveedores';
    const apiUrlWithId: string = this.urlBase + 'CatalogoProveedores/' + id;

    if(this.patchData.find(patch => patch.path === 'name')?.value === null)
      return throwError(() => new Error('El nombre no puede ser vacío'));

    if(this.patchData.find(patch => patch.path === 'category')?.value === null)
      return throwError(() => new Error('Se debe seleccionar un rubro'));

    return this.http.patch<Provider>(apiUrlWithId, this.patchData, this.httpOptions);
  }
}
