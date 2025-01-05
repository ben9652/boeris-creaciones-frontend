import { Component, effect } from '@angular/core';
import { equalsArraysRoles, Partner, PartnerType } from '../../../../../core/models/partner.entities';
import { PickListModule, PickListSourceSelectEvent, PickListTargetSelectEvent } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListPartnersService } from '../list-partners/list-partners.service';
import { RolesService } from './roles.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PartnersService } from '../partners.service';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-roles',
    imports: [
        PickListModule,
        DragDropModule,
        FieldsetModule,
        ButtonModule,
        ToastModule,
        TranslateModule,
        DialogModule
    ],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    providers: [MessageService]
})
export class RolesComponent {
  selectedRole?: PartnerType;
  selectedPartner: Partner | null = null;
  thereArePartners: boolean = false;

  partnerRoles: PartnerType[] = [];

  assignedRoles: PartnerType[] = [];
  availableRoles: PartnerType[] = [];

  // Para que el botón "Aplicar" de deshabilite cuando los roles asignados al socio sean iguales a los que tiene el socio actualmente
  assignedRolesEqualsToPartnerRoles: boolean = true;

  isLoadingRoleChanges: boolean = false;
  isLoadingPartner: boolean = false;

  displayRoleExplanation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private listPartnersService: ListPartnersService,
    private partnersService: PartnersService,
    public rolesService: RolesService,
    private location: Location,
    private messageService: MessageService,
    public translateService: TranslateService
  ) {
    effect(() => {
      if(this.partnerRoles.length === 0) {
        this.partnerRoles = [...this.rolesService.roles];
      }
      this.assignedRoles = [...rolesService.assignedRoles];
      this.availableRoles = [...rolesService.nonAssignedRoles];
    });
    effect(() => {
      this.isLoadingPartner = true;

      this.selectedPartner = partnersService.partner;

      this.isLoadingPartner = false;
    })
    effect(() => {
      const partners: Partner[] | null = listPartnersService.getPartners();

      if(partners !== null && partners.length === 0) {
        this.thereArePartners = false;
      }
    })
  }

  onSelectedRole(event: PickListTargetSelectEvent | PickListSourceSelectEvent) {
    if(event.items.length > 1) {
      event.items.shift();
    }
    let role: PartnerType = event.items[0];
    this.selectedRole = role;
  }

  get partner(): Partner | undefined {
    return this.rolesService.partner;
  }

  equalsRoles(): boolean {
    if(this.rolesService.partner) {
      return equalsArraysRoles(this.rolesService.partner.partnerRoles, this.assignedRoles);
    }
    return true;
  }

  private assignRoles() {
    if(this.partner) {
      const partner: Partner = this.partner;
      partner.partnerRoles = this.assignedRoles;
      this.rolesService.partner = partner;
    }
    
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: this.translateService.instant('SHARED.MESSAGES.DETAIL.MODIFIED_ROLES')
    });
    
    this.isLoadingRoleChanges = false;
  }

  applyChanges() {
    this.isLoadingRoleChanges = true;
    this.rolesService.assignRolesToPartner(this.assignedRoles).subscribe({
      next: () => {
        // Si se asignaron correctamente los roles, se actualiza el socio para que se
        // actualice en todos los servicios y componentes que estén suscritos al
        // socio guardado en el servicio PartnersService
        this.assignRoles();
      },
      error: (err) => {
        this.assignRoles();
      }
    });
  }
}
