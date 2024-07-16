import { Component, input, InputSignal } from '@angular/core';
import { MainBannerComponent } from '../../main-section/main-banner/main-banner.component';

@Component({
  selector: 'app-banner-subsections',
  standalone: true,
  imports: [
    MainBannerComponent
  ],
  templateUrl: './banner-subsections.component.html',
  styleUrl: './banner-subsections.component.scss'
})
export class BannerSubsectionsComponent {
  title: InputSignal<string> = input.required<string>();
}
