import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { areBranchesEqual, Branch } from '../../../../core/models/branch.entities';
import { PatchObject } from '../../../../core/models/patchObj.entities';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BranchesCatalogService {
  urlBase: string;
  httpOptions?: HttpOptions;

  disableDataEdition = signal<boolean>(true);

  selectedBranch: WritableSignal<Branch | null> = signal<Branch | null>(null);
  selectedNonModifiedBranch: Branch | null = null;

  nonModified: boolean = true;

  branchUpdated: boolean = false;

  patchData: PatchObject[] = [];

  modalTitle = "";
  modalVisibility = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private translateService: TranslateService
  ) {
    this.urlBase = environment.API_URL + 'CatalogoSucursales';
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
    const apiUrl: string = this.urlBase;

    if(this.httpOptions === undefined)
      this.httpOptions = new HttpOptions(this.authService.getToken());

    if(this.selectedBranch()?.name === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.FIELD_NAME_LACK')));

    if(this.selectedBranch()?.locality === null)
      return throwError(() => new Error('SECTIONS.CATALOGS.BRANCHES.LOCALITY_MODAL.WARNINGS.MUST_SELECT_LOCALITY'));
    
    if(this.selectedBranch()?.name && this.selectedBranch()?.locality)
      return this.http.post<Branch>(apiUrl, newBranch, this.httpOptions);
    else
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.FIELDS_LACK')));
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

  editBranch(id: number): Observable<Branch>{
    const apiUrl: string = this.urlBase;
    const apiUrlWithId: string = this.urlBase + `/${id}`;

    if(this.patchData.find(patch => patch.path === 'name')?.value === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.FIELD_NAME_LACK')));

    if(this.patchData.find(patch => patch.path === 'category')?.value === null)
      return throwError(() => new Error(this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.CATEGORY_MODAL.WARNINGS.MUST_SELECT_LOCALITY')));

    return this.http.patch<Branch>(apiUrlWithId, this.patchData, this.httpOptions);
  }
}
