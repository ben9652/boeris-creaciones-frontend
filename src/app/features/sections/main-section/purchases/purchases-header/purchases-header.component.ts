import { Component, output, OutputEmitterRef } from '@angular/core';
import { TableFilterComponent } from '../../../../../shared/table-utils/table-filter/table-filter.component';
import { TableSearchBarComponent } from '../../../../../shared/table-utils/table-search-bar/table-search-bar.component';
import { TableSortingComponent } from '../../../../../shared/table-utils/table-sorting/table-sorting.component';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { FilterObject } from '../../../../../core/models/filterObj.entities';
import { PurchasesHeaderService } from './purchases-header.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-purchases-header',
  imports: [
    TableFilterComponent,
    TableSearchBarComponent,
    TableSortingComponent,
    SkeletonModule
  ],
  templateUrl: './purchases-header.component.html',
  styleUrl: './purchases-header.component.scss'
})
export class PurchasesHeaderComponent {
  filters: FilterObject[] = [];
  filtersLoading: boolean = true;
  onFilterChanges: OutputEmitterRef<string[]> = output<string[]>();

  constructor(
    public deviceTypeService: DeviceTypeService,
    private purchasesHeaderService: PurchasesHeaderService
  ) {
    purchasesHeaderService.getFilters().subscribe((filters: any[]) => {
      filters.forEach((filter: any) => {
        this.filters.push(new FilterObject(filter.key, filter.name, filter.color));
      });
      
      this.filtersLoading = false;
    })
  }

  onFilterChangesHandler(selectedFilters: string[]): void {
    this.onFilterChanges.emit(selectedFilters);
  }
}
