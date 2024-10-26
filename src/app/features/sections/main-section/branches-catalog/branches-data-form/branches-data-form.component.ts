import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateService } from '@ngx-translate/core';
import { BrancesCatalogService } from '../brances-catalog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { Branch, Locality } from '../../../../../core/models/branch.entities';
import { BranchesListService } from '../branches-list/branches-list.service';
import { LocalityManagerComponent } from "./locality-manager/locality-manager.component";



@Component({
  selector: 'app-branches-data-form',
  standalone: true,
  imports: [ToastModule, ButtonModule, InputTextModule, CommonModule, FormsModule, LocalityManagerComponent],
  templateUrl: './branches-data-form.component.html',
  styleUrl: './branches-data-form.component.scss',
  providers: [MessageService, TranslateService]
})
export class BranchesDataFormComponent {
  loading: boolean = false;

  constructor(public translateService: TranslateService, public branchesCatalogService: BrancesCatalogService, private messageService: MessageService, private deviceTypeService: DeviceTypeService, private location: Location, public branchesListService: BranchesListService){

  }

  updateBranchName(value: string) {
    this.branchesCatalogService.updateSelectedBranch('name', value);
    this.branchesCatalogService.addPatchObject('replace', 'name', value);
  }

  clickOnCancel(){
    this.branchesCatalogService.toggleEdition(true);
    if(this.deviceTypeService.isMobile()){
      this.location.back();
    }
    this.branchesCatalogService.selectedBranch.set(null);
    this.branchesCatalogService.patchData.splice(0);
  }

  cliclOnConfirm(){
    this.loading = true;
    if(this.branchesCatalogService.selectedBranch()?.id === 0){
      this.branchesCatalogService.addNewBranch().subscribe({
        next: (response: Branch) => {
          this.branchesListService.addBranch(response);
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.SUCCESSES.CREATED')
          });
          this.loading = false;
          if(this.deviceTypeService.isMobile()){
            this.branchesCatalogService.selectedBranch.set(null);
            this.location.back();
          } else {
            this.branchesCatalogService.selectedBranch.set(response);
            this.branchesCatalogService.selectedNonModifiedBranch = response;
          }
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.FIELDS_LACK')
          });
          this.loading = false;
        }
      });
    } else {
      const selectedId: number | undefined = this.branchesCatalogService.selectedBranch()?.id;
      if(selectedId && this.branchesCatalogService.patchData.length > 0){
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
            if(this.deviceTypeService.isMobile()){
              this.branchesCatalogService.selectedBranch.set(null);
              this.location.back();
            } else {
              this.branchesCatalogService.selectedBranch.set(response);
              this.branchesCatalogService.selectedNonModifiedBranch = response;
            }
          }, error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.ERRORS.UPDATE')
            });
            this.loading = false;
          }
        });
      }
    }
  }
}
