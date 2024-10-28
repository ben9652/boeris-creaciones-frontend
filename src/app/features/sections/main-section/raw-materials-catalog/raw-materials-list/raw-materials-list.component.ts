import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { areRawMaterialsEqual, createNullRawMaterial, createRawMaterialRow, RawMaterial, RawMaterialRow } from '../../../../../core/models/rawMaterial.entities';
import { RawMaterialsCatalogService } from '../raw-materials-catalog.service';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { RawMaterialsListService } from './raw-materials-list.service';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';

@Component({
  selector: 'app-raw-material-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    TranslateModule,
    SkeletonModule
  ],
  templateUrl: './raw-materials-list.component.html',
  styleUrl: './raw-materials-list.component.scss',
  providers: [TranslateService]
})
export class RawMaterialListComponent {
  rawMaterialsMap: Map<number, RawMaterialRow> = new Map<number, RawMaterialRow>();

  constructor(
    public rawMaterialsCatalogService: RawMaterialsCatalogService,
    public rawMaterialsListService: RawMaterialsListService,
    private deviceTypeService: DeviceTypeService,
    private router: Router,
    public translateService: TranslateService
  ) {
    effect(() => {
      const selectedRawMaterial: RawMaterial | null = rawMaterialsCatalogService.selectedRawMaterial();
      if(selectedRawMaterial !== null) {
        let actualRawMaterial: RawMaterialRow | undefined = this.rawMaterialsMap.get(selectedRawMaterial.id);

        // Si la materia prima no es indefinida, significa que seleccionamos una materia prima de la lista
        if(actualRawMaterial !== undefined) {
          actualRawMaterial.modified = selectedRawMaterial;

          // Si la materia prima sufrió una modificación en la base de datos
          if(!rawMaterialsCatalogService.nonModified && rawMaterialsCatalogService.rawMaterialUpdated) {
            actualRawMaterial.nonModified = selectedRawMaterial;
            actualRawMaterial.modified = selectedRawMaterial;
            rawMaterialsCatalogService.rawMaterialUpdated = false;
            rawMaterialsCatalogService.nonModified = true;
          }
          else {

          }
        }

        // Si es indefinida, significa que no se encuentra en la lista
        else {
          // Si su ID es mayor a 0, significa que agregamos la materia prima
          if(selectedRawMaterial.id !== 0) {
            this.rawMaterialsMap.set(selectedRawMaterial.id, createRawMaterialRow(selectedRawMaterial, selectedRawMaterial));
          }
        }
      }
      
      else if(rawMaterialsCatalogService.selectedNonModifiedRawMaterial) {
        const id: number = rawMaterialsCatalogService.selectedNonModifiedRawMaterial.id;

        let rawMaterialRowNoAffected: RawMaterialRow | undefined = this.rawMaterialsMap.get(id);
        if(rawMaterialRowNoAffected) {
          const nonModifiedRawMaterial: RawMaterial = rawMaterialRowNoAffected.nonModified;
          rawMaterialRowNoAffected.modified = nonModifiedRawMaterial;
          rawMaterialsCatalogService.selectedNonModifiedRawMaterial = null;
          rawMaterialsCatalogService.nonModified = true;
        }
      }
    })
  }

  ngOnInit(): void {
    this.rawMaterialsListService.getRawMaterialsFromDatabase().subscribe((response: RawMaterial[]) => {
      this.rawMaterialsListService.rawMaterials.set(response);
      response.forEach((rawMaterial: RawMaterial) => {
        this.rawMaterialsMap.set(rawMaterial.id, createRawMaterialRow(rawMaterial, rawMaterial));
      })
    });
  }

  getRawMaterialsList(): RawMaterialRow[] {
    const rawMaterialRows: RawMaterialRow[] = Array.from(this.rawMaterialsMap.values());
    return rawMaterialRows;
  }

  youAreAdding(): boolean {
    return this.rawMaterialsCatalogService.selectedRawMaterial()?.id === 0;
  }

  clickOnAddNewRawMaterial() {
    this.rawMaterialsCatalogService.selectedRawMaterial.set(createNullRawMaterial());
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['raw-material-addition']);
    }
  }

  clickOnRawMaterial(rawMaterial: RawMaterialRow) {
    this.rawMaterialsCatalogService.selectedNonModifiedRawMaterial = rawMaterial.nonModified;
    this.rawMaterialsCatalogService.selectedRawMaterial.set(rawMaterial.modified);
    this.rawMaterialsCatalogService.nonModified = areRawMaterialsEqual(rawMaterial.nonModified, rawMaterial.modified);
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['raw-material-edition']);
    }
  }
}
