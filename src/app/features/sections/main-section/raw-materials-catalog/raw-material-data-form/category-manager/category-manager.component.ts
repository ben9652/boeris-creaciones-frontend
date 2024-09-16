import { Component, effect } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../../../../../core/models/category.entities';
import { RawMaterialCatalogService } from '../../raw-material-catalog.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [DropdownModule, ButtonModule, FormsModule],
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.scss'
})
export class CategoryManagerComponent {
  categorys: Category[] = [];

  constructor(public rawMaterialCatalogService: RawMaterialCatalogService) {
    effect(() => {
      this.loadCategorys();
    });
  }

  disabledEdition(): boolean {
    return this.rawMaterialCatalogService.disableDataEdition();
  }

  loadCategorys(){
    this.rawMaterialCatalogService.getCategorys().subscribe(data => {
      this.categorys = data;
    }, error => {

    });
  }

  updateRawMaterialCategory(value: Category){
    this.rawMaterialCatalogService.updateSelectedRawMaterial('category', value);
  }
}
