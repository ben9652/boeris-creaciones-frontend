import { Component, output, OutputEmitterRef } from '@angular/core';
import { BranchBase } from '../../../core/models/branch.entities';
import { BranchesService } from '../../../core/services/catalogs/branches.service';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectItemGroup } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-branches-dropdown',
  imports: [SelectModule, FormsModule, SkeletonModule],
  templateUrl: './branches-dropdown.component.html',
  styleUrl: './branches-dropdown.component.scss',
  providers: [TranslateService],
})
export class BranchesDropdownComponent {
  groupedBranches: SelectItemGroup[] | null = null;

  getBranch: OutputEmitterRef<BranchBase> = output<BranchBase>();

  constructor(
    private branchesService: BranchesService,
    public translateService: TranslateService
  ) {
    branchesService
      .getBranchesFromDatabase()
      .subscribe((branches: SelectItemGroup[]) => {
        branchesService.branches.set(branches);
        this.groupedBranches = branches;
      });
  }

  onSelection(event: SelectChangeEvent) {
    this.getBranch.emit(event.value);
  }
}
