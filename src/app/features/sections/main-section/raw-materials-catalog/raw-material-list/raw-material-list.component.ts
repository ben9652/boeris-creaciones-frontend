import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { RawMaterial } from '../../../../../core/models/rawMaterial.entities';
import { RawMaterialCatalogService } from '../raw-material-catalog.service';

@Component({
  selector: 'app-raw-material-list',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './raw-material-list.component.html',
  styleUrl: './raw-material-list.component.scss'
})
export class RawMaterialListComponent {
  rawMaterialsList: RawMaterial[] = [];

  constructor(private rawMaterialCatalogService: RawMaterialCatalogService){
    effect(() => {
      if (this.rawMaterialCatalogService.refreshNeeded()) {
        this.loadRawMaterialsList();
      }
    }, {allowSignalWrites: true});
  }

  ngOnInit(){
    this.loadRawMaterialsList();
  }
  
  selectRawMaterial(rawMaterial: RawMaterial) {
    this.rawMaterialCatalogService.selectRawMaterial(rawMaterial);
  }

  clickOnAddNewRawMaterial(){
    this.rawMaterialCatalogService.createNewSelectedRawMaterial();
  }

  clickOnRawMaterial(rawMaterial: RawMaterial){
    this.rawMaterialCatalogService.mode.set('edit');
    this.rawMaterialCatalogService.toggleEdition(false);
    this.rawMaterialCatalogService.selectRawMaterial(rawMaterial);
  }

  loadRawMaterialsList(){
    console.log("CARGA LA LISTA DE MP");
    this.rawMaterialCatalogService.getRawMaterialsList().subscribe(data => {
      this.rawMaterialsList = data;
      this.rawMaterialCatalogService.calculateNextId(this.rawMaterialsList.length);
      this.rawMaterialCatalogService.resetRefresh();
      console.log(data);
    }, error => {

    });
  }
}
