import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RawMaterialListComponent } from "./raw-materials-list/raw-materials-list.component";
import { DeviceTypeService } from '../../../../core/services/device-type/device-type.service';
import { RawMaterialDataFormComponent } from './raw-material-data-form/raw-material-data-form.component';

@Component({
    selector: 'app-raw-materials-catalog',
    imports: [
        RawMaterialListComponent,
        RawMaterialDataFormComponent,
        DividerModule
    ],
    templateUrl: './raw-materials-catalog.component.html',
    styleUrl: './raw-materials-catalog.component.scss'
})
export class RawMaterialsCatalogComponent {

  constructor(public deviceTypeService: DeviceTypeService) {

  }

}
