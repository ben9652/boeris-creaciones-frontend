import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ListRawMaterialsComponent } from "./list-raw-materials/list-raw-materials.component";
import { RawMaterialsDataComponent } from './raw-materials-data/raw-materials-data.component';
import { Router } from '@angular/router';
import { RawMaterial } from '../../../../core/models/rawMaterial.entities';
import { RawMaterialService } from '../../../../core/services/raw-material.service';

@Component({
  selector: 'app-raw-materials-catalog',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    ListRawMaterialsComponent,
    RawMaterialsCatalogComponent,
    RawMaterialsDataComponent
],
  templateUrl: './raw-materials-catalog.component.html',
  styleUrl: './raw-materials-catalog.component.scss'
})
export class RawMaterialsCatalogComponent {
  isMobile: boolean = false;
  showDataComponent: boolean = false;

  constructor(private router: Router, public rawMaterialService: RawMaterialService){
    effect(() => {
      this.showDataComponent = this.rawMaterialService.viewDataComponent();
    });
  }

  ngDoCheck(): void {
    this.isMobile = sessionStorage.getItem('isMobile') !== null ? true : false;
  }

  AddRawMaterial(){
    this.rawMaterialService.ToggleEditionButton(true);
    this.rawMaterialService.selectRawMaterial(this.createEmptyRawMaterial());
    this.rawMaterialService.ToggleDataComponent(true);
    if(this.isMobile){
      this.router.navigate(['raw-material-addition']);
    }
  }

  EditRawMaterial(){
    this.rawMaterialService.ToggleDataComponent(true);
    if(this.isMobile){
      this.router.navigate(['raw-material-edition']);
    }
  }

  createEmptyRawMaterial(): RawMaterial{
    return new RawMaterial(11, null, null, null, null, null, 0);
  }

  selectRawMaterial(rawMaterial: RawMaterial){
    this.rawMaterialService.selectRawMaterial(rawMaterial);
  }
}
