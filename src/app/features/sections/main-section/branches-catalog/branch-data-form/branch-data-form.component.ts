import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { Branch } from '../../../../../core/models/branch.entities';
import { BranchesListService } from '../branches-list/branches-list.service';
import { LocalityManagerComponent } from '../../../../../shared/locality-manager/locality-manager.component';
import { BranchesCatalogService } from '../branches-catalog.service';
import { Locality } from '../../../../../core/models/locality.entities';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-branch-data-form',
  standalone: true,
  imports: [
    LocalityManagerComponent,
    InputTextModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './branch-data-form.component.html',
  styleUrl: './branch-data-form.component.scss',
  providers: [MessageService, TranslateService]
})
export class BranchDataFormComponent {
  loading: boolean = false;

  constructor(
    public branchesCatalogService: BranchesCatalogService,
    public branchesListService: BranchesListService,
    private messageService: MessageService,
    private deviceTypeService: DeviceTypeService,
    private location: Location,
    public translateService: TranslateService
  ) {

  }

  updateBranchLocality(value: Locality | null) {
    this.branchesCatalogService.updateSelectedBranch('locality', value);
    this.branchesCatalogService.addPatchObject('replace', 'locality', value);
  }

  localityNameEdition(value: Locality) {
    let currentBranch: Branch | null = this.branchesCatalogService.selectedBranch();
    if(currentBranch)
      currentBranch.locality = value;
  }

  updateBranchName(value: string) {
    let name: string | null;
    
    if(value.length === 0)
      name = null;
    else
      name = value;
    
    this.branchesCatalogService.updateSelectedBranch('name', name);
    this.branchesCatalogService.addPatchObject('replace', 'name', name);
  }

  updateBranchDomicile(value: string) {
    let domicile: string | null;
    
    if(value.length === 0)
      domicile = null;
    else
      domicile = value;
    
    this.branchesCatalogService.updateSelectedBranch('domicile', domicile);
    this.branchesCatalogService.addPatchObject('replace', 'domicile', value);
  }

  clickOnCancel(){
    if(this.deviceTypeService.isMobile()){
      this.location.back();
    }
    this.branchesCatalogService.selectedBranch.set(null);
    this.branchesCatalogService.patchData.splice(0);
  }

  clickOnConfirm() {
    this.loading = true;

    const selectedBranch: Branch | null = this.branchesCatalogService.selectedBranch();
    if(selectedBranch) {
      const isLocalityNull: boolean = selectedBranch.locality === null;
      const isNameNull: boolean = selectedBranch.name === null;

      if(isLocalityNull || isNameNull) {
        this.loading = false;

        const nullField: boolean[] = [
          isLocalityNull,
          isNameNull
        ];
        this.throwWarningForEmptyFields(nullField);

        return;
      }
    }

    // Si se crea una nueva sucursal
    if(this.branchesCatalogService.selectedBranch()?.id === 0) {
      this.branchesCatalogService.addNewBranch().subscribe({
        next: (response: Branch) => {
          this.branchesListService.addBranch(response);
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.SUCCESSES.CREATED')
          });
          this.loading = false;
          if(this.deviceTypeService.isMobile()) {
            this.branchesCatalogService.selectedBranch.set(null);
            this.location.back();
          }
          else {
            this.branchesCatalogService.selectedBranch.set(response);
            this.branchesCatalogService.selectedNonModifiedBranch = response;
          }
          this.branchesListService.addBranch(response);
        },
        error: (e: HttpErrorResponse) => {
          const error = e.error;
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: error ? error.message : this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.FIELDS_LACK')
          });
          this.loading = false;
        }
      });
    }

    // Si se edita una sucursal
    else {
      const selectedId: number | undefined = this.branchesCatalogService.selectedBranch()?.id;
      if(selectedId && this.branchesCatalogService.patchData.length > 0) {
        this.branchesCatalogService.editBranch(selectedId).subscribe({
          next: (response: Branch) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
              detail: this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.SUCCESSES.UPDATED')
            });
            this.branchesCatalogService.patchData.splice(0);
            this.branchesCatalogService.branchUpdated = true;
            this.loading = false;
            if(this.deviceTypeService.isMobile()) {
              this.branchesCatalogService.selectedBranch.set(null);
              this.location.back();
            }
            else {
              this.branchesCatalogService.selectedBranch.set(response);
              this.branchesCatalogService.selectedNonModifiedBranch = response;
            }
            this.branchesListService.editBranch(response.id, response);
          },
          error: (e: HttpErrorResponse) => {
            const error = e.error;
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: error ? error.message : this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.UPDATE')
            });
            this.loading = false;
          }
        })
      }
    }
  }

  private throwWarningForEmptyFields(nullField: boolean[]) {
    if(nullField[0]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.WARNINGS.FIELDS_LACK.LOCALITY')
      });
    }

    else if(nullField[1]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.WARNINGS.FIELDS_LACK.NAME')
      });
    }
  }
}
