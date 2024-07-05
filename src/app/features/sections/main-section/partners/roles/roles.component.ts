import { Component, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { PartnerType } from '../../../../../core/models/partner.entities';
import { PickListModule, PickListSourceSelectEvent, PickListTargetSelectEvent } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    PickListModule,
    DragDropModule,
    FieldsetModule,
    ButtonModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  // Roles asignados al socio seleccionado
  assignedRoles: ModelSignal<PartnerType[]> = model.required();

  // Los roles que no se asignaron al socio
  availableRoles: ModelSignal<PartnerType[]> = model.required();

  selectedRole?: PartnerType;

  // Para eventos por la aplicación de los cambios
  onRolesApplying: OutputEmitterRef<PartnerType[]> = output<PartnerType[]>();

  isLoading: ModelSignal<boolean> = model.required<boolean>();

  onSelectedRole(event: PickListTargetSelectEvent | PickListSourceSelectEvent) {
    this.selectedRole = event.items[0];
  }

  applyChanges() {
    this.onRolesApplying.emit(this.assignedRoles());
  }
}
