import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RawMaterialListComponent } from "./raw-material-list/raw-material-list.component";
import { RawMaterialDataFormComponent } from './raw-material-data-form/raw-material-data-form.component';

@Component({
  selector: 'app-raw-materials-catalog',
  standalone: true,
  imports: [RawMaterialListComponent, RawMaterialDataFormComponent, DividerModule],
  templateUrl: './raw-materials-catalog.component.html',
  styleUrl: './raw-materials-catalog.component.scss'
})
export class RawMaterialsCatalogComponent {
  isMobile: boolean = false;

}
