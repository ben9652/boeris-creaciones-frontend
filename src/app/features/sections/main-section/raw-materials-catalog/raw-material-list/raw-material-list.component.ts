import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { RawMaterial } from '../../../../../core/models/rawMaterial.entities';
import { RawMaterialCatalogService } from '../raw-material-catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raw-material-list',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './raw-material-list.component.html',
  styleUrl: './raw-material-list.component.scss'
})
export class RawMaterialListComponent {
  rawMaterialsList: RawMaterial[] = [];

  constructor(private rawMaterialCatalogService: RawMaterialCatalogService, private router: Router){
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
    if(this.rawMaterialCatalogService.isMobile()){
      this.router.navigate(['raw-material-addition']);
    }
  }

  clickOnRawMaterial(rawMaterial: RawMaterial){
    this.rawMaterialCatalogService.mode.set('edit');
    this.rawMaterialCatalogService.toggleEdition(false);
    this.rawMaterialCatalogService.selectRawMaterial(rawMaterial);
    if(this.rawMaterialCatalogService.isMobile()){
      this.router.navigate(['raw-material-edition']);
    }
  }

  loadRawMaterialsList(){
    this.rawMaterialCatalogService.getRawMaterialsList().subscribe(data => {
      this.rawMaterialsList = data;
      this.rawMaterialCatalogService.calculateNextId(this.rawMaterialsList.length);
      this.rawMaterialCatalogService.resetRefresh();
    }, error => {

    });
  }
}
