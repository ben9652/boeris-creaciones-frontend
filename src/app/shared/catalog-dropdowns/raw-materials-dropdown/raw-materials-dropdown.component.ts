import { Component, output, OutputEmitterRef } from '@angular/core';
import { RawMaterialsService } from '../../../core/services/catalogs/raw-materials.service';
import { RawMaterial, RawMaterialBase } from '../../../core/models/rawMaterial.entities';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectItemGroup } from 'primeng/api';

@Component({
    selector: 'app-raw-materials-dropdown',
    imports: [
        SelectModule,
        SkeletonModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './raw-materials-dropdown.component.html',
    styleUrl: './raw-materials-dropdown.component.scss'
})
export class RawMaterialsDropdownComponent {
  rawMaterials: SelectItemGroup[] | null = null;

  getRawMaterial: OutputEmitterRef<RawMaterialBase> = output<RawMaterialBase>();

  constructor(
    private rawMaterialsService: RawMaterialsService
  ) {
    rawMaterialsService.getRawMaterialsFromDatabase().subscribe((rawMaterials: SelectItemGroup[]) => {
      rawMaterialsService.rawMaterials.set(rawMaterials);
      this.rawMaterials = rawMaterials;
    })
  }

  onSelection(event: SelectChangeEvent) {
    this.getRawMaterial.emit(event.value);
  }
}
