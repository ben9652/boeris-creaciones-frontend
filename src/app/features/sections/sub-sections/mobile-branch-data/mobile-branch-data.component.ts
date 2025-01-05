import { Component } from '@angular/core';
import { BranchDataFormComponent } from '../../main-section/branches-catalog/branch-data-form/branch-data-form.component';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';

@Component({
    selector: 'app-mobile-branch-data',
    imports: [
        BannerSubsectionsComponent,
        BranchDataFormComponent
    ],
    templateUrl: './mobile-branch-data.component.html',
    styleUrl: './mobile-branch-data.component.scss'
})
export class MobileBranchDataComponent {

}
