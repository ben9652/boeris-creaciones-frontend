import { Component, effect, ViewChild } from '@angular/core';
import { CategoryManagerComponent } from "./category-manager/category-manager.component";
import { ImageManagerComponent } from "./image-manager/image-manager.component";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { RawMaterialCatalogService } from '../raw-material-catalog.service';
import { areRawMaterialsEqual, RawMaterial, Source, Unit } from '../../../../../core/models/rawMaterial.entities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PatchObject } from '../../../../../core/models/patchObj.entities';
import { Category } from '../../../../../core/models/category.entities';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-raw-material-data-form',
  standalone: true,
  imports: [
    CategoryManagerComponent,
    ImageManagerComponent,
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

  units: Unit[] = [];
  sources: Source[] = [
    {
      label: "C",
      value: "Por compra"
    },
    {
      label: "E",
      value: "Por elaboración"
    },
    {
      label: "P",
      value: "Por producción propia"
    }
  ];
  newCategoryName: string = "";
  editingCategoryId: number | null = null;
  loading: boolean = false;
  modalLoading: boolean = false;
  isMobile: boolean = false;
  @ViewChild(CategoryManagerComponent) categoryManager!: CategoryManagerComponent;

  constructor(
    public rawMaterialCatalogService: RawMaterialCatalogService,
    private messageService: MessageService,
    private location: Location,
    public translateService: TranslateService
  ) {
    effect(() => {
      this.getUnits();
    });
  }
  
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.isMobile = sessionStorage.getItem('isMobile') !== null ? true : false;
  }

  getSourceValue() {
    return this.sources.find(source => source.label === this.rawMaterialCatalogService.selectedRawMaterial()?.source);
  }

  updateRawMaterialName(value: string) {
    this.rawMaterialCatalogService.updateSelectedRawMaterial('name', value);
    this.rawMaterialCatalogService.addPatchObject('replace', '/name', value);
  }

  updateRawMaterialUnit(value: Unit) {
    this.rawMaterialCatalogService.updateSelectedRawMaterial('unit', value);
    this.rawMaterialCatalogService.addPatchObject('replace', '/unit', value);
  }

  updateRawMaterialSource(value: Source) {
    this.rawMaterialCatalogService.updateSelectedRawMaterial('source', value.label);
    this.rawMaterialCatalogService.addPatchObject('replace', '/source', value.label);
  }

  updateRawMaterialComment(value: string) {
    this.rawMaterialCatalogService.updateSelectedRawMaterial('comment', value);
    this.rawMaterialCatalogService.addPatchObject('replace', '/comment', value);
  }

  updateRawMaterialPicture(value: File) {
    const pictureString: string = URL.createObjectURL(value);
    this.rawMaterialCatalogService.updateSelectedRawMaterial('picture', pictureString);
    this.rawMaterialCatalogService.addPatchObject('replace', '/picture', pictureString);
  }

  disabledEdition(): boolean {
    return this.rawMaterialCatalogService.disableDataEdition();
  }

  getUnits() {
    this.rawMaterialCatalogService.getUnits().then((units: Unit[]) => {
      this.units = units;
    });
  }

  clickOnConfirm() {
    this.loading = true;
    switch (this.rawMaterialCatalogService.mode()) {
      case 'new':
        this.rawMaterialCatalogService.addNewRawMaterial().subscribe({
          next: (response: RawMaterial) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
              detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.SUCCESSES.CREATED')
            });
            this.rawMaterialCatalogService.triggerRefresh();
            this.loading = false;
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
        break;
      case "edit":
        const selectedId = this.rawMaterialCatalogService.selectedRawMaterial()?.id;
        if (selectedId && this.rawMaterialCatalogService.patchData.length > 0) {
          this.rawMaterialCatalogService.editRawMaterial(selectedId, this.rawMaterialCatalogService.patchData).subscribe({
            next: (response: RawMaterial) => {
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
                detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.SUCCESSES.UPDATED')
              });
              this.rawMaterialCatalogService.patchData = [];
              this.rawMaterialCatalogService.triggerRefresh();
              this.loading = false;
            }, error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
                detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.ERRORS.UPDATE')
              });
              this.loading = false;
            }
          });
        }
        break;
      default:
        break;
    }
    this.rawMaterialCatalogService.toggleEdition(true);
    if(this.isMobile) {
      this.location.back();
    }
  }

  clickOnCancel() {
    const clonedRawMaterial: RawMaterial | null = structuredClone(this.rawMaterialCatalogService.previousRawMaterial);
    this.rawMaterialCatalogService.selectedRawMaterial.set(clonedRawMaterial);
    this.rawMaterialCatalogService.toggleEdition(true);
    if(this.isMobile) {
      this.location.back();
    }
  }

  clickOnModalCancel() {
    this.modalLoading = false;
    this.rawMaterialCatalogService.modalVisibility = false;
  }

  clickOnModalConfirm() {
    this.modalLoading = true;
    switch (this.rawMaterialCatalogService.modalTitle) {
      case "Nuevo":
        const newCategory: Category = {
          id: this.categoryManager.categories.length + 1,
          name: this.newCategoryName
        }
        this.rawMaterialCatalogService.createCategory(newCategory).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
              detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.SUCCESSES.CATEGORY_CREATED')
            });
            this.rawMaterialCatalogService.triggerRefresh();
            this.rawMaterialCatalogService.modalVisibility = false;
            this.modalLoading = false;
          }, error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.ERRORS.CATEGORY_CREATION')
            });
            this.rawMaterialCatalogService.modalVisibility = false;
          }
        });
        break;
      case "Editar":
        if(this.editingCategoryId){
          this.rawMaterialCatalogService.editCategory(this.editingCategoryId, this.newCategoryName).subscribe({
            next: (response: Category) => {
              this.messageService.add({
                severity: 'success',
                summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
                detail: this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.SUCCESSES.CATEGORY_UPDATED')
              });
              this.rawMaterialCatalogService.triggerRefresh();
              this.rawMaterialCatalogService.modalVisibility = false;
              this.modalLoading = false;
            }, error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
                detail: err.message || this.translateService.instant('SECTIONS.CATALOGS.RAW_MATERIALS.ERRORS.CATEGORY_UPDATING')
              });
              this.rawMaterialCatalogService.modalVisibility = false;
            }
          });
        }
        break;
      default:
        break;
    }
  }

  onModalKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.newCategoryName !== this.rawMaterialCatalogService.selectedRawMaterial()?.category?.name) {
      this.clickOnModalConfirm();
    }
  }

  showWarningMessage(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
      detail: message
    });
  }

  setModalCategoryName(category: Category) {
    this.newCategoryName = category.name;
    this.editingCategoryId = category.id;
  }
}
