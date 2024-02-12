import { Component, OnInit } from '@angular/core';
import { RawMaterial } from './card-raw-material/raw-material.entities';

@Component({
  selector: 'app-list-raw-materials',
  templateUrl: './list-raw-materials.component.html',
  styleUrls: ['./list-raw-materials.component.scss']
})
export class ListRawMaterialsComponent implements OnInit {
  rawMaterialExample: RawMaterial;

  ngOnInit(): void {

  }

  constructor() {
    this.rawMaterialExample = new RawMaterial(
      2418290,
      'D',
      'Palillos de madera',
      5120,
      'unidades',
      'Un gran proveedor de madera refinada',
      new Date('2021-07-26'),
      new Date('2022-01-08'),
      new Date('2023-03-15'),
      12,
      8,
      'Este proveedor es el mejor',
    );
  }
}
