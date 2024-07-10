import { Component } from '@angular/core';
import { Partner, PartnerType } from '../../../../../core/models/partner.entities';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    PickListModule,
    DragDropModule,
    FieldsetModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers: [MessageService]
})
export class RolesComponent {
  selectedRole?: PartnerType;

  assignedRoles: PartnerType[] = [];
  availableRoles: PartnerType[] = [];

  isLoading: boolean = false;

  errorMessage?: string;

  assignedRolesSubscription?: Subscription;
  nonAssignedRolesSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private listPartnersService: ListPartnersService,
    public rolesService: RolesService,
    private location: Location,
    private messageService: MessageService
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.assignedRolesSubscription = this.rolesService.assignedRoles.subscribe((roles: PartnerType[]) => {
      // console.log('Se obtienen los roles asignados: ', roles);
      this.assignedRoles = roles;
    })
    this.nonAssignedRolesSubscription = this.rolesService.nonAssignedRoles.subscribe((roles: PartnerType[]) => {
      // console.log('Se obtienen los roles NO asignados: ', roles);
      this.availableRoles = roles;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.assignedRolesSubscription?.unsubscribe();
    this.nonAssignedRolesSubscription?.unsubscribe();
  }

  onSelectedRole(event: PickListTargetSelectEvent | PickListSourceSelectEvent) {
    this.selectedRole = event.items[0];
  }

  get partner(): Partner | undefined {
    return this.rolesService.partner;
  }

  applyChanges() {
    this.isLoading = true;
    this.rolesService.assignRolesToPartner(this.assignedRoles).subscribe(() => {
      // Si se asignaron correctamente los roles, se actualiza el socio para que se
      // actualice en todos los servicios y componentes que estén suscritos al
      // socio guardado en el servicio PartnersService
      if(this.partner) {
        const partner: Partner = this.partner;
        partner.partnerRoles = this.assignedRoles;
        this.rolesService.partner = partner;
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Se modificaron los roles'
      });
      
      this.isLoading = false;
    });
  }
}
