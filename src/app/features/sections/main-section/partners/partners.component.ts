import { afterRender, Component, signal, WritableSignal } from '@angular/core';
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
    private deviceType: DeviceTypeService
  ) {

    afterRender(() => {
      this.isMobile = deviceType.isMobile();
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.partnerSubscription = this.partnersService.partner.subscribe((partner: Partner) => {
      this.selectedPartner = partner;
    })
  }

  addPartner(registerPartnerData: PartnerRegister | null) {
    // Si se clickó el botón "Cancelar"
    if(registerPartnerData === null) {
      this.addMode = false;
      return;
    }
    this.listPartnersService.registerPartner(registerPartnerData).subscribe((newPartner: Partner | null) => {
      if(newPartner) {
        this.partnersService.partner = newPartner;
      }
      this.isLoading.set(false);
      this.addMode = false;
    })
  }
}
