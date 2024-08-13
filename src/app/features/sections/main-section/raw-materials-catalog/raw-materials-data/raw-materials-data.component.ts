import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Location } from '@angular/common';
import { RawMaterialService } from '../../../../../core/services/raw-material.service';
import { RawMaterial } from '../../../../../core/models/rawMaterial.entities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-raw-materials-data',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './raw-materials-data.component.html',
  styleUrl: './raw-materials-data.component.scss'
})
export class RawMaterialsDataComponent {
  rubros: string[] = [
    "Rubro 1",
    "Rubro 2",
    "Rubro 3"
  ];
  unidad: string[] = [
    "centimetros",
    "litros",
    "newton?"
  ];

  isMobile: boolean = false;
  selectedRawMaterial: RawMaterial | null = null;

  constructor(private location: Location, private rawMaterialService: RawMaterialService) {
    effect(() => {
      this.selectedRawMaterial = rawMaterialService.selectedRawMaterial();
    })
  }

  ngDoCheck(): void {
    this.isMobile = sessionStorage.getItem('isMobile') !== null ? true : false;
  }


  clickOnCancel() {
    this.rawMaterialService.ToggleDataComponent(false);
    this.rawMaterialService.ToggleEditionButton(true);
    this.rawMaterialService.selectRawMaterial(null);
    if (this.isMobile) {
      this.location.back();
    }
  }

  clickOnConfirm() {
    //Crea la nueva materia al final del vector
    console.log(this.selectedRawMaterial);
    this.rawMaterialService.ToggleEditionButton(true);
    this.rawMaterialService.ToggleDataComponent(false);
    if(this.isMobile){
      this.location.back();
    }
  }

  selectRawMaterial(rawMaterial: RawMaterial) {
    this.rawMaterialService.selectRawMaterial(rawMaterial);
  }

  get selectedRawMaterialRubro(): string | null {
    return this.selectedRawMaterial?.rubro ?? null;
  }

  get selectedRawMaterialNombre(): string | null {
    return this.selectedRawMaterial?.nombre ?? null;
  }
  get selectedRawMaterialUnidad(): string | null {
    return this.selectedRawMaterial?.unidad ?? null;
  }

  get selectedRawMaterialComentario(): string | null {
    return this.selectedRawMaterial?.comentario ?? null;
  }

  get selectedRawMaterialImagen(): string | null {
    return this.selectedRawMaterial?.imagen ?? null;
  }

  getBackgroundImage(): string {
    const defaultImage = 'pictures/leaf-solid.svg';
    return this.selectedRawMaterial?.imagen ? `${this.selectedRawMaterial.imagen}` : defaultImage;
  }

  newRawMaterialId(){
    //Calcular el siguiente numero de id segun el ultimo del vector de materias primas
  }

  set selectedRawMaterialNombre(value: string){
    if(this.selectedRawMaterial){
      this.selectedRawMaterial.nombre = value;
    }
  }

  set selectedRawMaterialImagen(value: string){
    if(this.selectedRawMaterial){
      this.selectedRawMaterial.imagen = value;
    }
  }

  set selectedRawMaterialRubro(value: string){
    if(this.selectedRawMaterial){
      this.selectedRawMaterial.rubro = value;
    }
  }

  set selectedRawMaterialUnidad(value: string){
    if(this.selectedRawMaterial){
      this.selectedRawMaterial.unidad = value;
    }
  }

  set selectedRawMaterialComentario(value: string){
    if(this.selectedRawMaterial){
      this.selectedRawMaterial.comentario = value;
    }
  }

}
