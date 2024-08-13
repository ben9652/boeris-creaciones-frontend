import { Component } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { TableModule } from 'primeng/table';
import { RawMaterial } from '../../../../../core/models/rawMaterial.entities';
import { RawMaterialService } from '../../../../../core/services/raw-material.service';

@Component({
  selector: 'app-list-raw-materials',
  standalone: true,
  imports: [
    ScrollerModule,
    TableModule
  ],
  templateUrl: './list-raw-materials.component.html',
  styleUrl: './list-raw-materials.component.scss'
})
export class ListRawMaterialsComponent {
  visibleExistingRawMaterials: RawMaterial[] = [
    new RawMaterial(1, 'Nombre largo de materia prima para ver como queda', 'pictures/leaf-solid.svg','Rubro 1', 'Unidad 1', 'Comentario sobre materia prima 1',0),
    new RawMaterial(2, 'Nombre de materia prima', 'pictures/envira-brands-solid.svg','Rubro 2', 'Unidad 2', 'Comentario sobre materia prima 2',0),
    new RawMaterial(3, 'Nombre corto', 'pictures/pagelines-brands-solid.svg','Rubro 3', 'Unidad 3', 'Comentario sobre materia prima 3',0),
    new RawMaterial(4, 'Nombre de materia prima con imagen null', null,'Rubro 4', 'Unidad 4', 'Otro comentario',0)
  ];

  constructor(private rawMaterialService: RawMaterialService){
    // this.rawMaterialService.getAllRawMaterials().then((visibleExistingRawMaterials: Object[]) => {
    //   this.QueTraeLaRequest = visibleExistingRawMaterials;
    //   console.log(this.QueTraeLaRequest);
    // });
  }

  selectRawMaterial(rawMaterial: RawMaterial){
    this.rawMaterialService.selectRawMaterial(rawMaterial);
    this.rawMaterialService.ToggleEditionButton(false);
  }
}
