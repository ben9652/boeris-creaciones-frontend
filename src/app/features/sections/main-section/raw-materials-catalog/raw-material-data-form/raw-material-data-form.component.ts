import { Component, effect } from '@angular/core';
import { ImageManagerComponent } from "./image-manager/image-manager.component";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { RawMaterialsCatalogService } from '../raw-materials-catalog.service';
import { RawMaterial, Source, Unit } from '../../../../../core/models/rawMaterial.entities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Category } from '../../../../../core/models/category.entities';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RawMaterialsListService } from '../raw-materials-list/raw-materials-list.service';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { UnitsService } from '../units.service';
import { CategoryManagerComponent } from '../../../../../shared/category-manager/category-manager.component';
import { HttpErrorResponse } from '@angular/common/http';

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

  selectedSource: Source | undefined;

  constructor(
    public rawMaterialsCatalogService: RawMaterialsCatalogService,
    public rawMaterialsListService: RawMaterialsListService,
    private unitsService: UnitsService,
    private messageService: MessageService,
    private deviceTypeService: DeviceTypeService,
    private location: Location,
    public translateService: TranslateService
  ) {
    effect(() => {
      const source: string | null | undefined = this.rawMaterialsCatalogService.selectedRawMaterial()?.source;
      this.selectedSource = this.sources.find(src => src.label === source);
    });
    
    unitsService.get().subscribe((units: Unit[]) => {
      this.units = units;
    });
    
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
    let name: string | null;
    if(value.length === 0) {
      name = null;
    }
    else {
      name = value;
    }
    this.rawMaterialsCatalogService.updateSelectedRawMaterial('name', name);
    this.rawMaterialsCatalogService.addPatchObject('replace', 'name', name);
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
    
    const selectedRawMaterial: RawMaterial | null = this.rawMaterialsCatalogService.selectedRawMaterial();
    if(selectedRawMaterial) {
      const isCategoryNull: boolean = selectedRawMaterial.category === null;
      const isNameNull: boolean = selectedRawMaterial.name === null;
      const isUnitNull: boolean = selectedRawMaterial.unit === null;
      const isSourceNull: boolean = selectedRawMaterial.source === null;

      if(isCategoryNull || isNameNull || isUnitNull || isSourceNull) {
        this.loading = false;

        const nullField: boolean[] = [
          isCategoryNull,
          isNameNull,
          isUnitNull,
          isSourceNull
        ];
        this.throwWarningForEmptyFields(nullField);
        
        return;
      }
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
    else {
      const selectedId: number | undefined = this.rawMaterialsCatalogService.selectedRawMaterial()?.id;
      if(selectedId && this.rawMaterialsCatalogService.patchData.length > 0) {
        this.rawMaterialsCatalogService.editRawMaterial(selectedId).subscribe({
          next: (response: RawMaterial) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
              detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.SUCCESSES.UPDATED')
            });
            this.rawMaterialsCatalogService.patchData.splice(0);
            this.rawMaterialsCatalogService.rawMaterialUpdated = true;
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
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.ERRORS.UPDATE')
            });
            this.loading = false;
          }
        });
      }
    }
  }

  private throwWarningForEmptyFields(nullField: boolean[]) {
    if(nullField[0]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.CATEGORY')
      });
    }

    else if(nullField[1]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.NAME')
      });
    }

    else if(nullField[2]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.UNIT')
      });
    }

    else if(nullField[3]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.WARNINGS.FIELDS_LACK.SOURCE')
      });
    }
  }
}
