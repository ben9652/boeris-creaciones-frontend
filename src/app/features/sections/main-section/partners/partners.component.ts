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
import { Subject } from 'rxjs';
import { DeviceTypeService } from '../../../../core/services/device-type.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    RolesComponent,
    PartnerAdditionComponent,
    ListPartnersComponent,
    ToastModule,
    DividerModule
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  providers: [MessageService]
})
export class PartnersComponent {
  addMode: WritableSignal<boolean> = signal<boolean>(false);

  selectedPartner?: Partner;
  assignedPartnerRoles: WritableSignal<PartnerType[]> = signal<PartnerType[]>([]);
  nonAssignedPartnerRoles: WritableSignal<PartnerType[]> = signal<PartnerType[]>([]);

  mappedPossiblePartnersRoles: Map<number, PartnerType> = new Map<number, PartnerType>();
  mappedNonAssignedPartnerRoles: Map<number, PartnerType> = new Map<number, PartnerType>();

  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  createdPartner: Subject<Partner> = new Subject<Partner>();

  isMobile: boolean = false;
  
  constructor(
    private rolesService: RolesService,
    private listPartnersService: ListPartnersService,
    private messageService: MessageService,
    private deviceType: DeviceTypeService
  ) {
    rolesService.getPartnersRoles().subscribe((roles: PartnerType[]) => {
      roles.forEach((role: PartnerType) => {
        this.mappedPossiblePartnersRoles.set(role.id, role);
      });
    })

    afterRender(() => {
      this.isMobile = deviceType.isMobile();
    })
  }

  getSelectedPartner(partner: Partner) {
    this.selectedPartner = partner;
    this.assignedPartnerRoles.set(partner.partnerRoles);
    this.mappedNonAssignedPartnerRoles.clear();
    this.nonAssignedPartnerRoles().splice(0);
    this.mappedPossiblePartnersRoles.forEach((role: PartnerType) => {
      this.mappedNonAssignedPartnerRoles.set(role.id, role);
    });

    this.selectedPartner.partnerRoles.forEach((role: PartnerType) => {
      this.mappedNonAssignedPartnerRoles.delete(role.id);
    });

    this.mappedNonAssignedPartnerRoles.forEach((role: PartnerType) => {
      this.nonAssignedPartnerRoles().push(role);
    });
  }

  changeRoles(roles: PartnerType[]) {
    let rolesIds: number[] = [];
    this.isLoading.set(true);
    roles.forEach((role: PartnerType) => {
      rolesIds.push(role.id);
    })
    if(this.selectedPartner) {
      this.rolesService.assignRolesToPartner(this.selectedPartner.id_user, rolesIds).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Se modificaron los roles'
        })
        this.isLoading.set(false);
      });
    }
  }

  addPartner(registerPartnerData: PartnerRegister | null) {
    // Si se clickó el botón "Cancelar"
    if(registerPartnerData === null) {
      this.addMode.set(false);
      return;
    }
    this.listPartnersService.registerPartner(registerPartnerData).subscribe((newPartner: Partner | null) => {
      if(newPartner) {
        this.getSelectedPartner(newPartner);
        this.createdPartner.next(newPartner);
      }
      this.isLoading.set(false);
      this.addMode.set(false);
    })
  }
}
