import { Component } from '@angular/core';
import { BannerSubsectionsComponent } from '../banner-subsections/banner-subsections.component';
import { PartnerAdditionComponent } from '../../main-section/partners/partner-addition/partner-addition.component';

@Component({
    selector: 'app-mobile-partner-addition',
    imports: [
        BannerSubsectionsComponent,
        PartnerAdditionComponent
    ],
    templateUrl: './mobile-partner-addition.component.html',
    styleUrl: './mobile-partner-addition.component.scss'
})
export class MobilePartnerAdditionComponent {

}
