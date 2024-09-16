import { Component, effect } from '@angular/core';
import { CategoryManagerComponent } from "./category-manager/category-manager.component";
import { ImageManagerComponent } from "./image-manager/image-manager.component";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { RawMaterialCatalogService } from '../raw-material-catalog.service';
import { RawMaterial, Source, Unit } from '../../../../../core/models/rawMaterial.entities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-raw-material-data-form',
  standalone: true,
  imports: [CategoryManagerComponent, ImageManagerComponent, InputTextModule, InputTextareaModule, DropdownModule, CommonModule, FormsModule, ButtonModule, ToastModule],
  templateUrl: './raw-material-data-form.component.html',
  styleUrl: './raw-material-data-form.component.scss',
  providers: [MessageService]
})
export class RawMaterialDataFormComponent {

  units: Unit[] = [];
  sources: Source[] = [
    {
      "label": "C",
      "value": "Por compra"
    },
    {
      "label": "E",
      "value": "Por elaboración"
    },
    {
      "label": "P",
      "value": "Por producción propia"
    }
  ];

  constructor(public rawMaterialCatalogService: RawMaterialCatalogService, private messageService: MessageService) {
    effect(() => {
      this.getUnits();
    });
  }

  getSourceValue(){
    return this.sources.find(source => source.label === this.rawMaterialCatalogService.selectedRawMaterial()?.source);
  }

  updateRawMaterialName(value: string){
    this.rawMaterialCatalogService.updateSelectedRawMaterial('name', value);
  }

  updateRawMaterialUnit(value: Unit){
    this.rawMaterialCatalogService.updateSelectedRawMaterial('unit', value);
  }

  updateRawMaterialSource(value: Source){
    this.rawMaterialCatalogService.updateSelectedRawMaterial('source', value.label);
  }

  updateRawMaterialComment(value: string){
    this.rawMaterialCatalogService.updateSelectedRawMaterial('comment', value);
  }

  disabledEdition(): boolean{
    return this.rawMaterialCatalogService.disableDataEdition();
  }

  getUnits(){
    this.rawMaterialCatalogService.getUnits().then((units: Unit[]) => {
      this.units = units;
    });
  }

  clickOnConfirm(){
    switch (this.rawMaterialCatalogService.mode()) {
      case 'new':
        this.rawMaterialCatalogService.addNewRawMaterial().subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Materia Prima creada con exito'
            });
            this.rawMaterialCatalogService.triggerRefresh();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message || 'Debe completar todos los campos obligatorios'
            });
          }
        });
        break;
      case "edit":
        console.log("AQUI SE EDITA MP");
        break;
      default:
        break;
    }
    this.rawMaterialCatalogService.toggleEdition(true);
  }

}
