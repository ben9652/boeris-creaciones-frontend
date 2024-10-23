import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
import { BrancesCatalogService } from '../brances-catalog.service';
import { BranchesListService } from './branches-list.service';
import { TableModule } from 'primeng/table';
import { areBranchesEqual, Branch, BranchRow, createBranchRow, createNullBranch } from '../../../../../core/models/branch.entities';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';




@Component({
  selector: 'app-branches-list',
  standalone: true,
  imports: [ButtonModule, TableModule, TranslateModule, SkeletonModule],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.scss',
  providers: [TranslateService]
})
export class BranchesListComponent {
  branchesMap: Map<number, BranchRow> = new Map<number, BranchRow>();

  constructor(public translateService: TranslateService, public branchesCatalogService: BrancesCatalogService, public branchesListService: BranchesListService, private deviceTypeService: DeviceTypeService, private router: Router){
    effect(() => {
      const selectedBranch: Branch | null = branchesCatalogService.selectedBranch();
      if(selectedBranch !== null){
        let actualBranch: BranchRow | undefined = this.branchesMap.get(selectedBranch.id);
        if(actualBranch !== undefined){
          actualBranch.modified = selectedBranch;
          if(!branchesCatalogService.nonModified && branchesCatalogService.branchUpdated){
            actualBranch.nonModified = selectedBranch;
            actualBranch.modified = selectedBranch;
            branchesCatalogService.branchUpdated = false;
            branchesCatalogService.nonModified = true;
          } else {
            //:/
          }
        } else {
          if(selectedBranch.id !== 0){
            this.branchesMap.set(selectedBranch.id, createBranchRow(selectedBranch, selectedBranch));
          }
        }
      } else if(branchesCatalogService.selectedNonModifiedBranch){
        const id: number = branchesCatalogService.selectedNonModifiedBranch.id;
        let branchRowNoAffected: BranchRow | undefined = this.branchesMap.get(id);
        if(branchRowNoAffected){
          const nonModifiedBranch: Branch = branchRowNoAffected.nonModified;
          branchRowNoAffected.modified = nonModifiedBranch;
          branchesCatalogService.selectedNonModifiedBranch = null;
          branchesCatalogService.nonModified = true;
        }
      }
    });
  }

  ngOnInit(){
    this.branchesListService.getBranchesFromDatabase().subscribe((response: Branch[]) => {
      this.branchesListService.branches.set(response);
      response.forEach((branch: Branch) => {
        this.branchesMap.set(branch.id, createBranchRow(branch, branch));
      })
    });
  }
  
  getBranchesList(){
    const branchRows: BranchRow[] = Array.from(this.branchesMap.values());
    return branchRows;
  }
  
  youAreAdding(){
    return this.branchesCatalogService.selectedBranch()?.id === 0;
  }

  clicOnAddNewBranch(){
    this.branchesCatalogService.selectedBranch.set(createNullBranch());
    if(this.deviceTypeService.isMobile()){
      this.router.navigate(['branch-addition']);
    }
  }

  clickOnBranch(branch: BranchRow){
    this.branchesCatalogService.selectedNonModifiedBranch = branch.nonModified;
    this.branchesCatalogService.selectedBranch.set(branch.modified);
    this.branchesCatalogService.nonModified = areBranchesEqual(branch.nonModified, branch.modified);
    if(this.deviceTypeService.isMobile()){
      this.router.navigate(['product-edition']);
    }
  }
}
