import { Injectable, signal, WritableSignal } from '@angular/core';
import { ListPartnersService } from './list-partners/list-partners.service';
import { Observable, Subject } from 'rxjs';
import { Partner } from '../../../../core/models/partner.entities';
import { RolesService } from './roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private _partner: WritableSignal<Partner> = signal<Partner>({
    id_user: 0,
    username: '',
    firstName: '',
    email: '',
    role: '',
    partnerRoles: []
  });

  constructor(
    
  ) {

  }

  get partner(): Partner {
    return this._partner();
  }

  set partner(partner: Partner) {
    this._partner.set(partner)
  }
}
