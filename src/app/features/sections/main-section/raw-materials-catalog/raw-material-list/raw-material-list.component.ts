import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { constructNullRawMaterial, isRawMaterialNull, RawMaterial } from '../../../../../core/models/rawMaterial.entities';
import { RawMaterialCatalogService } from '../raw-material-catalog.service';
import { Router } from '@angular/router';
import { RawMaterialRow } from './raw-material-list.entities';

@Component({
  selector: 'app-raw-material-list',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './raw-material-list.component.html',
  styleUrl: './raw-material-list.component.scss'
})
export class RawMaterialListComponent {
  rawMaterialsList: RawMaterialRow[] = [];

  constructor(private rawMaterialCatalogService: RawMaterialCatalogService, private router: Router){
    effect(() => {
      if (this.rawMaterialCatalogService.refreshNeeded()) {
        this.loadRawMaterialsList();
      }
      const rawMaterialModified: RawMaterial | null = rawMaterialCatalogService.selectedRawMaterial();
      if(rawMaterialModified !== null && !isRawMaterialNull(rawMaterialModified)) {
        const id: number | null = rawMaterialModified.id;
        const index: number = this.rawMaterialsList.findIndex((rawMaterialRow: RawMaterialRow) => rawMaterialRow.modified.id === id);
        
        if(index !== -1) {
          this.rawMaterialsList[index].modified = rawMaterialModified;
        }
        const disabledEdition: boolean = rawMaterialCatalogService.disableDataEdition()
        if(disabledEdition) {
          rawMaterialCatalogService.selectedRawMaterial.set(constructNullRawMaterial());
        }
      }
    }, {allowSignalWrites: true});
  }

  ngOnInit(){
    this.loadRawMaterialsList();
  }
  
  selectRawMaterial(rawMaterial: RawMaterialRow) {
    this.rawMaterialCatalogService.selectRawMaterial(rawMaterial);
  }

  clickOnAddNewRawMaterial() {
    this.rawMaterialCatalogService.createNewSelectedRawMaterial();
    if(this.rawMaterialCatalogService.isMobile()){
      this.router.navigate(['raw-material-addition']);
    }
  }

  clickOnRawMaterial(rawMaterial: RawMaterialRow) {
    this.rawMaterialCatalogService.mode.set('edit');
    this.rawMaterialCatalogService.toggleEdition(false);
    this.rawMaterialCatalogService.selectRawMaterial(rawMaterial);
    if(this.rawMaterialCatalogService.isMobile()){
      this.router.navigate(['raw-material-edition']);
    }
  }

  loadRawMaterialsList() {
    this.rawMaterialsList.splice(0);
    this.rawMaterialCatalogService.getRawMaterialsList().subscribe((data: RawMaterial[]) => {
      data.forEach((rawMaterial: RawMaterial) => {
        this.rawMaterialsList.push({
          nonModified: rawMaterial,
          modified: rawMaterial
        });
      });
      this.rawMaterialCatalogService.calculateNextId(this.rawMaterialsList.length);
      this.rawMaterialCatalogService.resetRefresh();
    });
  }
}
