import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { RawMaterialsService } from '../../../core/services/catalogs/raw-materials.service';
import { RawMaterial } from '../../../core/models/rawMaterial.entities';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectItemGroup } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-raw-materials-dropdown',
  imports: [SelectModule, SkeletonModule, FormsModule, CommonModule],
  templateUrl: './raw-materials-dropdown.component.html',
  styleUrl: './raw-materials-dropdown.component.scss',
  providers: [TranslateService],
})
export class RawMaterialsDropdownComponent {
  rawMaterials: SelectItemGroup[] | null = null;

  getRawMaterial: OutputEmitterRef<RawMaterial> = output<RawMaterial>();

  disabled: InputSignal<boolean> = input<boolean>(false);

  constructor(
    private rawMaterialsService: RawMaterialsService,
    public translateService: TranslateService
  ) {
    rawMaterialsService
      .getRawMaterialsFromDatabase()
      .subscribe((rawMaterials: SelectItemGroup[]) => {
        rawMaterialsService.rawMaterials.set(rawMaterials);
        this.rawMaterials = rawMaterials;
      });
  }

  onSelection(event: SelectChangeEvent) {
    this.getRawMaterial.emit(event.value);
  }
}
