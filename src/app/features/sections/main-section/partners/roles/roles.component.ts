import { Component, effect } from '@angular/core';
import { equalsArraysRoles, Partner, PartnerType } from '../../../../../core/models/partner.entities';
import { PickListModule, PickListMoveToSourceEvent, PickListMoveToTargetEvent, PickListSourceSelectEvent, PickListTargetSelectEvent } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListPartnersService } from '../list-partners/list-partners.service';
import { RolesService } from './roles.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-roles',
    imports: [
        PickListModule,
        DragDropModule,
        FieldsetModule,
        ButtonModule,
        ToastModule,
        TranslateModule
    ],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    providers: [MessageService]
})
export class RolesComponent {
  selectedRole?: PartnerType;
  thereArePartners: boolean = true;

  partnerRoles: PartnerType[] = [];

  assignedRoles: PartnerType[] = [];
  availableRoles: PartnerType[] = [];

  // Para que el botón "Aplicar" de deshabilite cuando los roles asignados al socio sean iguales a los que tiene el socio actualmente
  assignedRolesEqualsToPartnerRoles: boolean = true;

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private listPartnersService: ListPartnersService,
    public rolesService: RolesService,
    private location: Location,
    private messageService: MessageService,
    public translateService: TranslateService
  ) {
    listPartnersService.partners.subscribe((partners: Partner[]) => {
      if(partners.length === 0) {
        this.thereArePartners = false;
      }
    })

    effect(() => {
      this.assignedRoles = [...rolesService.assignedRoles];
      this.availableRoles = [...rolesService.nonAssignedRoles];
    });
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
    
    this.isLoading = false;
  }

  applyChanges() {
    this.isLoading = true;
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
