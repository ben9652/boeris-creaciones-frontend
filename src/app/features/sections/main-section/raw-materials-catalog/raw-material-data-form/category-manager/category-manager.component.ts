import { Component, effect, EventEmitter, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../../../../../core/models/category.entities';
import { RawMaterialCatalogService } from '../../raw-material-catalog.service';
import { FormsModule } from '@angular/forms';
import { PatchObject } from '../../../../../../core/models/patchObj.entities';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [DropdownModule, ButtonModule, FormsModule],
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.scss'
})
export class CategoryManagerComponent {
  categorys: Category[] = [];
  selectedCategory!: Category;
  patchData: PatchObject[] = [];

  @Output() warningMessage = new EventEmitter<string>();
  @Output() nameOfCategory = new EventEmitter<Category>();

  constructor(public rawMaterialCatalogService: RawMaterialCatalogService) {
    effect(() => {
      if (this.rawMaterialCatalogService.refreshNeeded()) {
        this.loadCategorys();
      }
    });
  }

  ngOnInit() {
    this.loadCategorys();
  }

  disabledEdition(): boolean {
    return this.rawMaterialCatalogService.disableDataEdition();
  }

  loadCategorys() {
    this.rawMaterialCatalogService.getCategorys().subscribe(data => {
      this.categorys = data;
      this.rawMaterialCatalogService.resetRefresh();
    }, error => {

    });
  }

  updateRawMaterialCategory(value: Category) {
    this.rawMaterialCatalogService.updateSelectedRawMaterial('category', value);
    this.rawMaterialCatalogService.addPatchObject('replace', '/category', value);
  }

  showModalCategory(modalRole: string) {
    switch (modalRole) {
      case 'new':
        this.rawMaterialCatalogService.modalTitle = "Nuevo";
        this.rawMaterialCatalogService.modalVisibility = true;
        break;
      case 'edit':
        this.rawMaterialCatalogService.modalTitle = "Editar";
        const rawMaterial = this.rawMaterialCatalogService.selectedRawMaterial();
        if(rawMaterial?.category){
          console.log(rawMaterial.category);
          this.nameOfCategory.emit(rawMaterial.category);
          this.rawMaterialCatalogService.modalVisibility = true;
        } else {
          this.warningMessage.emit('Debe seleccionar un Rubro para editar');
        }
        break;

      default:
        break;
    }
  }
}
