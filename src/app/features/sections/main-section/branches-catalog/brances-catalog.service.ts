import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { areBranchesEqual, Branch } from '../../../../core/models/branch.entities';
import { PatchObject } from '../../../../core/models/patchObj.entities';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrancesCatalogService {
  urlBase: string;
  httpOptions?: HttpOptions;

  selectedBranch: WritableSignal<Branch | null> = signal<Branch | null>(null);
  selectedNonModifiedBranch: Branch | null = null;

  nonModified: boolean = true;

  branchUpdated: boolean = false;

  patchData: PatchObject[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {
    this.urlBase = environment.API_URL;
    this.httpOptions = new HttpOptions(authService.getToken());
   }

   updateSelectedBranch(property: keyof Branch, value: any){
    const currentBranch: Branch | null = this.selectedBranch();
    if(currentBranch){
      this.selectedBranch.set({ ...currentBranch, [property]: value});
      this.nonModified = areBranchesEqual(this.selectedNonModifiedBranch, this.selectedBranch());
    }
   }

   addNewBranch(): Observable<Branch> {
    let newBranch: Branch | null = this.selectedBranch();
    const apiUrl: string = this.urlBase + 'CatalogoSucursales';
    if(this.httpOptions === undefined){
      this.httpOptions = new HttpOptions(this.authService.getToken());
    }
    if(this.selectedBranch()?.name && this.selectedBranch()?.location){
      return this.http.post<Branch>(apiUrl, newBranch, this.httpOptions);
    } else {
      return throwError(() => new Error('Debe completar todos los campos obligatorios'));
    }
   }

   addPatchObject(op: string, path: string, value: any){
    const alreadyAddedPatch: PatchObject | undefined = this.patchData.find(patch => patch.path === path);
    const isNotNull: boolean = value !== null && value !== undefined;
    if(alreadyAddedPatch && !isNotNull){
      const index: number = this.patchData.indexOf(alreadyAddedPatch);
      this.patchData.splice(index, 1);
      return;
    }
    if(isNotNull){
      if(alreadyAddedPatch){
        alreadyAddedPatch.value = value;
      } else {
        this.patchData.push(new PatchObject(op, path, value));
      }
    }
   }

   editBranch(id: number): Observable<Branch>{
    const apiUrl: string = this.urlBase + 'CatalogoSucursales';
    const apiUrlWithId: string = this.urlBase + 'CatalogoSucursales/' + id;
    if(this.patchData.find(patch => patch.path === 'name')?.value === '') {
      return throwError(() => new Error('El nombre no puede ser vacio'));
    }
    return this.http.patch<Branch>(apiUrlWithId, this.patchData, this.httpOptions);
   }
}
