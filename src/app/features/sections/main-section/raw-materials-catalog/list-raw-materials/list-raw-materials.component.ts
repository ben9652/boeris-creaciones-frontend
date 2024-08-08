import { Component } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { TableModule } from 'primeng/table';

interface RawMaterial {
  id: number;
  nombre: string;
  stock: number;
}

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
    { id: 1, nombre: 'Material A con nombre bien pero bien pero bien largo para ver como queda', stock: 100 },
    { id: 2, nombre: 'Material B', stock: 50 },
    { id: 3, nombre: 'Material C', stock: 200 },
    { id: 4, nombre: 'Material D', stock: 100 },
    { id: 5, nombre: 'Material E', stock: 50 },
    { id: 6, nombre: 'Material F', stock: 200 },
    { id: 7, nombre: 'Material G', stock: 100 },
    { id: 8, nombre: 'Material H', stock: 50 },
    { id: 9, nombre: 'Material I', stock: 200 },
    { id: 10, nombre: 'Material J', stock: 100 },
    { id: 11, nombre: 'Material K', stock: 50 },
    { id: 12, nombre: 'Material L', stock: 200 },
    { id: 13, nombre: 'Material M', stock: 100 },
    { id: 14, nombre: 'Material N', stock: 50 },
    { id: 15, nombre: 'Material O', stock: 200 }
  ];
}
