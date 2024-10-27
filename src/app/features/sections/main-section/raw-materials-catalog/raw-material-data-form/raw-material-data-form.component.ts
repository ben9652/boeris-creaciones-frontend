import { Component, effect, ViewChild } from '@angular/core';
import { ImageManagerComponent } from "./image-manager/image-manager.component";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { RawMaterialsCatalogService } from '../raw-materials-catalog.service';
import { areRawMaterialsEqual, RawMaterial, Source, Unit } from '../../../../../core/models/rawMaterial.entities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PatchObject } from '../../../../../core/models/patchObj.entities';
import { Category } from '../../../../../core/models/category.entities';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RawMaterialsListService } from '../raw-materials-list/raw-materials-list.service';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { UnitsService } from '../units.service';
import { CategoryManagerComponent } from '../../../../../shared/category-manager/category-manager.component';

@Component({
  selector: 'app-raw-material-data-form',
  standalone: true,
  imports: [
    ImageManagerComponent,
    CategoryManagerComponent,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    TranslateModule
  ],
  templateUrl: './raw-material-data-form.component.html',
  styleUrl: './raw-material-data-form.component.scss',
  providers: [MessageService, TranslateService]
})
export class RawMaterialDataFormComponent {
  loading: boolean = false;

  units: Unit[] = [];
  sources: Source[];

  constructor(
    public rawMaterialsCatalogService: RawMaterialsCatalogService,
    public rawMaterialsListService: RawMaterialsListService,
    private unitsService: UnitsService,
    private messageService: MessageService,
    private deviceTypeService: DeviceTypeService,
    private location: Location,
    public translateService: TranslateService
  ) {
    unitsService.get().subscribe((units: Unit[]) => {
      this.units = units;
    })
    
    this.sources = [
      new Source('C', 'Por compra'),
      new Source('E', 'Por elaboración'),
      new Source('P', 'Por producción propia')
    ];
  }

  updateRawMaterialCategory(value: Category | null) {
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('category', value);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'category', value);
  }

  updateRawMaterialName(value: string) {
    let comment: string | null;
    if(value.length === 0) {
      comment = null;
    }
    else {
      comment = value;
    }
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('name', comment);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'name', comment);
  }

  updateRawMaterialUnit(value: Unit | null) {
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('unit', value);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'unit', value);
  }

  updateRawMaterialSource(value: Source) {
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('source', value.label);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'source', value.label);
  }

  updateRawMaterialPicture(value: File) {
    const pictureString: string = URL.createObjectURL(value);
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('picture', pictureString);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'picture', pictureString);
  }

  updateRawMaterialComment(value: string) {
    let comment: string | null;
    if(value.length === 0) {
      comment = null;
    }
    else {
      comment = value;
    }
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('comment', comment);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'comment', comment);
  }

  getPicture(): string | null {
    const rawMaterial: RawMaterial | null = this.rawMaterialsCatalogService.selectedRawMaterial();
    return rawMaterial ? rawMaterial.picture : null;
  }

  clickOnCancel() {
    if(this.deviceTypeService.isMobile()) {
      this.location.back();
    }
    this.rawMaterialsCatalogService.selectedRawMaterial.set(null);
    this.rawMaterialsCatalogService.patchData.splice(0);
  }

  clickOnConfirm() {
    this.loading = true;

    if(this.rawMaterialsCatalogService.patchData.find(patch => patch.path === 'category') === undefined) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.CATEGORY')
      });
      this.loading = false;
      return;
    }

    if(this.rawMaterialsCatalogService.patchData.find(patch => patch.path === 'name') === undefined) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.NAME')
      });
      this.loading = false;
      return;
    }

    if(this.rawMaterialsCatalogService.patchData.find(patch => patch.path === 'unit') === undefined) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.UNIT')
      });
      this.loading = false;
      return;
    }

    if(this.rawMaterialsCatalogService.patchData.find(patch => patch.path === 'source') === undefined) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.SOURCE')
      });
      this.loading = false;
      return;
    }

    // Si se crea una nueva materia prima
    if(this.rawMaterialsCatalogService.selectedRawMaterial()?.id === 0) {
      this.rawMaterialsCatalogService.addNewRawMaterial().subscribe({
        next: (response: RawMaterial) => {
          this.rawMaterialsListService.addRawMaterial(response);
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.SUCCESSES.CREATED')
          });
          this.loading = false;
          if(this.deviceTypeService.isMobile()) {
            this.rawMaterialsCatalogService.selectedRawMaterial.set(null);
            this.location.back();
          }
          else {
            this.rawMaterialsCatalogService.selectedRawMaterial.set(response);
            this.rawMaterialsCatalogService.selectedNonModifiedRawMaterial = response;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.ERRORS.FIELDS_LACK')
          });
          this.loading = false;
        }
      });
    }

    // Si se edita una materia prima

  }
}
