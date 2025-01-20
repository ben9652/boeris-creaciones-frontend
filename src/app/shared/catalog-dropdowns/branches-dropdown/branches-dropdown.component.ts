import { Component, output, OutputEmitterRef } from '@angular/core';
import { BranchBase } from '../../../core/models/branch.entities';
import { BranchesService } from '../../../core/services/catalogs/branches.service';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectItemGroup } from 'primeng/api';

@Component({
    selector: 'app-branches-dropdown',
    imports: [
        SelectModule,
        FormsModule,
        SkeletonModule
    ],
    templateUrl: './branches-dropdown.component.html',
    styleUrl: './branches-dropdown.component.scss'
})
export class BranchesDropdownComponent {
  groupedBranches: SelectItemGroup[] | null = null;
  
  getBranch: OutputEmitterRef<BranchBase> = output<BranchBase>();
translateService: any;

  constructor(
    private branchesService: BranchesService
  ) {
    branchesService.getBranchesFromDatabase().subscribe((branches: SelectItemGroup[]) => {
      branchesService.branches.set(branches);
      this.groupedBranches = branches;
    });
  }

  onSelection(event: SelectChangeEvent) {
    this.getBranch.emit(event.value);
  }
}
