import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ListRawMaterialsComponent } from "./list-raw-materials/list-raw-materials.component";
import { RawMaterialsDataComponent } from './raw-materials-data/raw-materials-data.component';

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

}
