import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { PopoverModule } from 'primeng/popover';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderInterfaceService } from '../../../../core/services/header-interface/header-interface.service';

@Component({
    selector: 'app-main-banner',
    imports: [
        TranslateModule,
        ButtonModule,
        SelectButtonModule,
        PopoverModule,
        UserMenuComponent,
        CommonModule,
        FormsModule
    ],
    templateUrl: './main-banner.component.html',
    styleUrl: './main-banner.component.scss'
})
export class MainBannerComponent {
  menuVisible: ModelSignal<boolean> = model(false);
  isDeployableMenu: InputSignal<boolean> = input<boolean>(true);
  isListBanner: InputSignal<boolean> = input<boolean>(false);
  title: InputSignal<string> = input<string>('Boeri\'s Creaciones');
  user_edition: InputSignal<boolean> = input<boolean>(true);

  // Atributos para cuando se elige que el banner sea de lista
  filterOptions: string[] = [
    'fas fa-filter fa-xl',
    'fas fa-magnifying-glass fa-xl',
    'fas fa-arrow-down-short-wide fa-xl'
  ];
  selectedFilter: string = this.filterOptions[0];
  
  constructor(
    public translateService: TranslateService,
    private location: Location,
    public headerInterfaceService: HeaderInterfaceService
  ) {
    
  }

  onClickLeftBanner() {
    if(this.isDeployableMenu()) {
      this.menuVisible.set(!this.menuVisible());
    }
    else {
      this.location.back();
    }
  }

  notifyNewElement() {
    this.headerInterfaceService.notifyNewElement();
  }

  notifyFilterSelected(event: SelectButtonOptionClickEvent) {
    const optionSelected: number | undefined = event.index;
    if (optionSelected !== undefined) {
        this.headerInterfaceService.notifyFilterSelected(optionSelected);
    }
    else {
        console.error('No se ha seleccionado una opción');
    }
  }
}
