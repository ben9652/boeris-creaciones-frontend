import { Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { RawMaterialsService } from '../../../core/services/catalogs/raw-materials.service';
import { RawMaterial } from '../../../core/models/rawMaterial.entities';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectItemGroup } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../../core/models/category.entities';

@Component({
  selector: 'app-raw-materials-dropdown',
  imports: [SelectModule, SkeletonModule, FormsModule, CommonModule],
  templateUrl: './raw-materials-dropdown.component.html',
  styleUrl: './raw-materials-dropdown.component.scss',
  providers: [TranslateService],
})
export class RawMaterialsDropdownComponent implements OnInit {
  groupedRawMaterials: SelectItemGroup[] | null = null;
  selectedRawMaterial: RawMaterial | null = null;

  getRawMaterial: OutputEmitterRef<RawMaterial> = output<RawMaterial>();

  disabled: InputSignal<boolean> = input<boolean>(false);

  categoriesIds: InputSignal<number[]> = input<number[]>([]);

  initialSelection: InputSignal<RawMaterial | null> = input<RawMaterial | null>(null);

  constructor(
    private rawMaterialsService: RawMaterialsService,
    public translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    let isNecessaryDownloadingAgain: boolean = false;
    
    let rawMaterialsGrouped: SelectItemGroup<RawMaterial>[] | null = this.rawMaterialsService.rawMaterials();
    if (rawMaterialsGrouped) {
      rawMaterialsGrouped.sort((a, b) => {
        const categoryA: Category | null = a.items[0].value.category;
        const categoryB: Category | null = b.items[0].value.category;
        if (categoryA && categoryB) {
          return categoryA.id - categoryB.id;
        }
        return 0;
      });

      const categoriesIds: number[] = rawMaterialsGrouped.map((group: SelectItemGroup<RawMaterial>) => {
        if (group.items[0].value.category) {
          return group.items[0].value.category.id;
        }
        return 0;
      });

      isNecessaryDownloadingAgain = !categoriesIds.every((id: number, index: number) => id === this.categoriesIds()[index]);
    }
    
    this.rawMaterialsService.getRawMaterialsFromDatabase(this.categoriesIds(), isNecessaryDownloadingAgain).subscribe((rawMaterials: SelectItemGroup<RawMaterial>[]) => {
      this.rawMaterialsService.rawMaterials.set(rawMaterials);
      this.groupedRawMaterials = rawMaterials;

      const initialSelection: RawMaterial | null = this.initialSelection();
      if (initialSelection) {
        this.groupedRawMaterials = this.groupedRawMaterials.map((group: SelectItemGroup<RawMaterial>) => {
          group.items = group.items.map((item) => {
            if (item.value === initialSelection) {
              this.selectedRawMaterial = initialSelection;
            }
            return item;
          });
          return group;
        });
      }
    });
  }

  onSelection(event: SelectChangeEvent) {
    this.getRawMaterial.emit(event.value);
  }
}
