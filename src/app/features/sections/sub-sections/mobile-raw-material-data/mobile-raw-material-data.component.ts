import { Component } from '@angular/core';
import { BannerSubsectionsComponent } from "../banner-subsections/banner-subsections.component";
import { RawMaterialDataFormComponent } from "../../main-section/raw-materials-catalog/raw-material-data-form/raw-material-data-form.component";

@Component({
    selector: 'app-mobile-raw-material-data',
    imports: [BannerSubsectionsComponent, RawMaterialDataFormComponent],
    templateUrl: './mobile-raw-material-data.component.html',
    styleUrl: './mobile-raw-material-data.component.scss'
})
export class MobileRawMaterialDataComponent {

}
