import { afterRender, Component, effect, signal, WritableSignal } from '@angular/core';
import { Partner, PartnerRegister, PartnerType } from '../../../../core/models/partner.entities';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { RolesComponent } from './roles/roles.component';
import { RolesService } from './roles/roles.service';
import { ListPartnersComponent } from './list-partners/list-partners.component';
import { PartnerAdditionComponent } from './partner-addition/partner-addition.component';
import { ListPartnersService } from './list-partners/list-partners.service';
import { Subject, Subscription } from 'rxjs';
import { DeviceTypeService } from '../../../../core/services/device-type.service';
import { PartnersService } from './partners.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    RolesComponent,
    PartnerAdditionComponent,
    ListPartnersComponent,
    ToastModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  providers: [MessageService]
})
export class PartnersComponent {
  addMode: boolean = false;
  
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  
  partnerSubscription?: Subscription;
  
  selectedPartner?: Partner;
  
  isMobile: boolean = false;
  
  constructor(
    private listPartnersService: ListPartnersService,
    private partnersService: PartnersService,
    private router: Router
  ) {
    listPartnersService.partners;
    effect(() => {
      this.selectedPartner = partnersService.partner;
    });
  }
  
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.isMobile = sessionStorage.getItem('isMobile') !== null ? true : false;
  }

  addedPartner() {
    // Si se clickó el botón "Cancelar"
    this.addMode = false;
    return;
  }

  clickOnAddPartner() {
    this.addMode = true;
    if(this.isMobile) {
      this.router.navigate(['partner-addition']);
    }
  }
}
