import { Component, OnInit } from '@angular/core';
import { RawMaterial } from './card-raw-material/raw-material.entities';

enum TipoMateriaPrima {
  CONTABLE_NUEVA,
  CONTABLE_EN_STOCK,
  CONTABLE_UTILIZADA,
  
  NO_CONTABLE_NUEVA,
  NO_CONTABLE_EN_STOCK,
  NO_CONTABLE_UTILIZADA
}

@Component({
  selector: 'app-list-raw-materials',
  templateUrl: './list-raw-materials.component.html',
  styleUrls: ['./list-raw-materials.component.scss']
})
export class ListRawMaterialsComponent implements OnInit {
  rawMaterialExample: RawMaterial;
  option!: string;
  isAdvancedSearchSelected: boolean = false;

  tipoMateriaPrima = TipoMateriaPrima.CONTABLE_NUEVA;

  ngOnInit(): void {

  }

  constructor() {
    switch(this.tipoMateriaPrima) {
      case TipoMateriaPrima.CONTABLE_NUEVA:
        this.rawMaterialExample = new RawMaterial(
          2418290,
          30,
          'Palillos de madera',
          5120,
          'Un gran proveedor de madera refinada',
          new Date('2021-07-26'),
          12,
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reiciendis dolores! Saepe dicta voluptatibus molestiae placeat delectus quaerat similique quas et. Debitis est et, sed dolore magni necessitatibus deserunt corporis?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat dignissimos beatae aliquid dicta sint mollitia cum tenetur nobis quidem provident odio eaque veritatis ea, inventore porro laudantium, ab nesciunt facilis.'
        );
        break;
      case TipoMateriaPrima.CONTABLE_EN_STOCK:
        this.rawMaterialExample = new RawMaterial(
          2418290,
          30,
          'Palillos de madera',
          5120,
          'Un gran proveedor de madera refinada',
          new Date('2021-07-26'),
          new Date('2021-07-28'),
          12,
          2
        );
        break;
      case TipoMateriaPrima.CONTABLE_UTILIZADA:
        this.rawMaterialExample = new RawMaterial(
          2418290,
          30,
          'Palillos de madera',
          5120,
          'Un gran proveedor de madera refinada',
          new Date('2021-07-26'),
          new Date('2021-07-28'),
          new Date('2021-08-21'),
          12,
          2
        );
        break;
      case TipoMateriaPrima.NO_CONTABLE_NUEVA:
        this.rawMaterialExample = new RawMaterial(
          9128501,
          87,
          'Tela blanca',
          8009,
          2,
          'm2',
          'El telar',
          new Date('2022-05-12'),
          'Se debe recoger por la tarde'
        );
        break;
      case TipoMateriaPrima.NO_CONTABLE_EN_STOCK:
        this.rawMaterialExample = new RawMaterial(
          9128501,
          90,
          'Tela blanca',
          8009,
          2,
          'm2',
          'El telar',
          new Date('2022-05-12'),
          new Date('2022-05-23')
        );
        break;
      case TipoMateriaPrima.NO_CONTABLE_UTILIZADA:
        this.rawMaterialExample = new RawMaterial(
          9128501,
          100,
          'Tela blanca',
          8009,
          2,
          'm2',
          'El telar',
          new Date('2022-05-12'),
          new Date('2022-05-23'),
          new Date('2022-09-02')
        );
        break;
      default:
        this.rawMaterialExample = new RawMaterial();
        break;
    }
  }
}
