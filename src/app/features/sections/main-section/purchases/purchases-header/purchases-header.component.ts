import { Component, output, OutputEmitterRef } from '@angular/core';
import { TableFilterComponent } from '../../../../../shared/table-utils/table-filter/table-filter.component';
import { TableSearchBarComponent } from '../../../../../shared/table-utils/table-search-bar/table-search-bar.component';
import { TableSortingComponent } from '../../../../../shared/table-utils/table-sorting/table-sorting.component';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { FilterObject } from '../../../../../core/models/filterObj.entities';
import { PurchasesHeaderService } from './purchases-header.service';
import { SkeletonModule } from 'primeng/skeleton';
import { SearchObject } from '../../../../../core/models/searchObj.entities';
import { TreeNode } from 'primeng/api';
import { SortingTreeObject } from '../../../../../core/models/sortingTreeObject';

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

  searchInput: string = '';
  searchSelectedFilter: string = '';
  searchFilters: SearchObject[] = [];
  searchFiltersLoading: boolean = true;
  onSearchChanges: OutputEmitterRef<SearchObject> = output<SearchObject>();

  possibleFilters: TreeNode<string>[] = [];
  onSortChanges: OutputEmitterRef<string[]> = output<string[]>();
  onSortDirectionChange: OutputEmitterRef<boolean> = output<boolean>();

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

    purchasesHeaderService.getSearchFilters().subscribe((searchFilters: SearchObject[]) => {
      searchFilters.forEach((searchFilter: SearchObject) => {
        this.searchFilters.push(searchFilter);
      });

      this.searchFiltersLoading = false;
      this.searchSelectedFilter = this.searchFilters[0].key;
      this.onSearchChanges.emit(this.searchFilters[0]);
    });

    purchasesHeaderService.getSortFilters().subscribe((sortElements: SortingTreeObject) => {
      this.possibleFilters = sortElements.tree;

      const indexes: string[] = sortElements.initialIndex.split('-');
      const firstIndex: number = parseInt(indexes[0]);
      const secondIndex: number = parseInt(indexes[1]);

      this.onSortChanges.emit([firstIndex.toString(), secondIndex.toString()]);
      this.onSortDirectionChange.emit(true);
    })
  }

  onFilterChangesHandler(selectedFilters: string[]): void {
    this.onFilterChanges.emit(selectedFilters);
  }

  onSearchInputHandler(searchInput: string) {
    if (searchInput === 'Backspace') {
      this.searchInput = this.searchInput.slice(0, -1);
      this.onSearchChanges.emit(new SearchObject(this.searchSelectedFilter, this.searchInput));
    }
    else {
      this.searchInput += searchInput;
      this.onSearchChanges.emit(new SearchObject(this.searchSelectedFilter, this.searchInput));
    }
  }

  onSearchFilterChangeHandler(key: string) {
    this.searchSelectedFilter = key;
    this.onSearchChanges.emit(new SearchObject(key, this.searchInput));
  }

  onSortChangesHandler(sort: string[]): void {
    this.onSortChanges.emit(sort);
  }

  onSortDirectionChangeHandler(ascendingSort: boolean): void {
    this.onSortDirectionChange.emit(ascendingSort);
  }
}
