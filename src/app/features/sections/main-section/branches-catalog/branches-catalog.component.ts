import { Component } from '@angular/core';
import { BranchesListComponent } from "./branches-list/branches-list.component";
import { BranchDataFormComponent } from './branch-data-form/branch-data-form.component';
import { DeviceTypeService } from '../../../../core/services/device-type/device-type.service';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-branches-catalog',
  standalone: true,
  imports: [BranchesListComponent, BranchDataFormComponent,DividerModule],
  templateUrl: './branches-catalog.component.html',
  styleUrl: './branches-catalog.component.scss'
})
export class BranchesCatalogComponent {

  constructor(public deviceTypeService: DeviceTypeService){

  }

}
