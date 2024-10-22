import { Component } from '@angular/core';
import { BranchesListComponent } from "./branches-list/branches-list.component";
import { BranchesDataFormComponent } from './branches-data-form/branches-data-form.component';
import { DeviceTypeService } from '../../../../core/services/device-type.service';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-branches-catalog',
  standalone: true,
  imports: [BranchesListComponent, BranchesDataFormComponent,DividerModule],
  templateUrl: './branches-catalog.component.html',
  styleUrl: './branches-catalog.component.scss'
})
export class BranchesCatalogComponent {

  constructor(public deviceTypeService: DeviceTypeService){

  }

}
