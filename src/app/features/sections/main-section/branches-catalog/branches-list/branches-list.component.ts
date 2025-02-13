import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
import { BranchesListService } from './branches-list.service';
import { TableModule } from 'primeng/table';
import {
  areBranchesEqual,
  Branch,
  BranchRow,
  createBranchRow,
  createNullBranch,
} from '../../../../../core/models/branch.entities';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { BranchesCatalogService } from '../branches-catalog.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branches-list',
  imports: [
    ButtonModule,
    TableModule,
    TranslateModule,
    SkeletonModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.scss',
  providers: [TranslateService],
})
export class BranchesListComponent {
  branchesMap: Map<number, BranchRow> = new Map<number, BranchRow>();

  branchSearch: string = '';
  existingBranches: BranchRow[] = [];
  visibleExistingBranches: BranchRow[] = [];

  constructor(
    public translateService: TranslateService,
    public branchesCatalogService: BranchesCatalogService,
    public branchesListService: BranchesListService,
    private deviceTypeService: DeviceTypeService,
    private router: Router
  ) {
    effect(() => {
      const selectedBranch: Branch | null =
        branchesCatalogService.selectedBranch();
      if (selectedBranch !== null) {
        let actualBranch: BranchRow | undefined = this.branchesMap.get(
          selectedBranch.id
        );

        // Si la sucursal no es indefinida significa que seleccionamos una sucursal de la lista
        if (actualBranch !== undefined) {
          actualBranch.modified = selectedBranch;

          // Si la sucursal sufrió una modificación en la base de datos
          if (
            !branchesCatalogService.nonModified &&
            branchesCatalogService.branchUpdated
          ) {
            actualBranch.nonModified = selectedBranch;
            actualBranch.modified = selectedBranch;
            branchesCatalogService.branchUpdated = false;
            branchesCatalogService.nonModified = true;
          } else {
            //:/
          }
        }

        // Si es indefinida, significa que no se encuentra en la lista
        else {
          // Si su ID es mayor a 0, significa que agregamos la sucursal
          if (selectedBranch.id !== 0) {
            this.branchesMap.set(
              selectedBranch.id,
              createBranchRow(selectedBranch, selectedBranch)
            );
          }
        }
      }

      // Si se apretó el botón de cancelar, es decir, si la sucursal seleccionada es nula
      else if (branchesCatalogService.selectedNonModifiedBranch) {
        const id: number = branchesCatalogService.selectedNonModifiedBranch.id;

        let branchRowNoAffected: BranchRow | undefined =
          this.branchesMap.get(id);
        if (branchRowNoAffected) {
          const nonModifiedBranch: Branch = branchRowNoAffected.nonModified;
          branchRowNoAffected.modified = nonModifiedBranch;
          branchesCatalogService.selectedNonModifiedBranch = null;
          branchesCatalogService.nonModified = true;
        }
      }
      this.existingBranches = Array.from(this.branchesMap.values());
      this.visibleExistingBranches = this.existingBranches;
    });
  }

  ngOnInit() {
    this.branchesListService
      .getBranchesFromDatabase()
      .subscribe((response: Branch[]) => {
        this.branchesListService.branches.set(response);
        response.forEach((branch: Branch) => {
          this.branchesMap.set(branch.id, createBranchRow(branch, branch));
        });
        this.existingBranches = Array.from(this.branchesMap.values());
        this.visibleExistingBranches = this.existingBranches;
      });
  }

  getBranchesList() {
    const branchRows: BranchRow[] = Array.from(this.branchesMap.values());
    return branchRows;
  }

  youAreAdding() {
    return this.branchesCatalogService.selectedBranch()?.id === 0;
  }

  clicOnAddNewBranch() {
    this.branchesCatalogService.selectedBranch.set(createNullBranch());
    if (this.deviceTypeService.isMobile()) {
      this.router.navigate(['branch-addition']);
    }
  }

  clickOnBranch(branch: BranchRow) {
    this.branchesCatalogService.selectedNonModifiedBranch = branch.nonModified;
    this.branchesCatalogService.selectedBranch.set(branch.modified);
    this.branchesCatalogService.nonModified = areBranchesEqual(
      branch.nonModified,
      branch.modified
    );
    if (this.deviceTypeService.isMobile()) {
      this.router.navigate(['branch-edition']);
    }
  }
  searchBranch() {
    if (this.existingBranches) {
      this.visibleExistingBranches = this.existingBranches.filter((res) =>
        res.modified.name
          ?.toLocaleLowerCase()
          .includes(this.branchSearch.toLocaleLowerCase())
      );
    }
  }
}
