import { Component, output, OutputEmitterRef } from '@angular/core';
import { RawMaterialsService } from '../../../core/services/catalogs/raw-materials.service';
import { RawMaterial } from '../../../core/models/rawMaterial.entities';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-raw-materials-dropdown',
  standalone: true,
  imports: [
    DropdownModule,
    SkeletonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './raw-materials-dropdown.component.html',
  styleUrl: './raw-materials-dropdown.component.scss'
})
export class RawMaterialsDropdownComponent {
  rawMaterials: RawMaterial[] | null = null;

  emitRawMaterial: OutputEmitterRef<RawMaterial> = output<RawMaterial>();

  selectedRawMaterial: RawMaterial | null = null;

  constructor(
    private rawMaterialsService: RawMaterialsService
  ) {
    rawMaterialsService.getRawMaterialsFromDatabase().subscribe((rawMaterials: RawMaterial[]) => {
      rawMaterialsService.rawMaterials.set(rawMaterials);
      this.rawMaterials = rawMaterials;
    })
  }

  onSelection(event: DropdownChangeEvent) {
    this.emitRawMaterial.emit(event.value);
  }
}
