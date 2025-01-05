import { Injectable, signal, WritableSignal } from '@angular/core';
import { ListPartnersService } from './list-partners/list-partners.service';
import { Observable, Subject } from 'rxjs';
import { Partner } from '../../../../core/models/partner.entities';
import { RolesService } from './roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private _partner: WritableSignal<Partner | null> = signal<Partner | null>(null);

  constructor(
    
  ) {

  }

  get partner(): Partner | null {
    return this._partner();
  }

  set partner(partner: Partner) {
    this._partner.set(partner)
  }
}
