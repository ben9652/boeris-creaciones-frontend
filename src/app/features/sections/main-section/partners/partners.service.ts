import { Injectable } from '@angular/core';
import { ListPartnersService } from './list-partners/list-partners.service';
import { Observable, Subject } from 'rxjs';
import { Partner } from '../../../../core/models/partner.entities';
import { RolesService } from './roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private partnerSource: Subject<Partner> = new Subject<Partner>();
  private partner$: Observable<Partner> = this.partnerSource.asObservable();

  constructor(
    
  ) {

  }

  get partner(): Observable<Partner> {
    return this.partner$;
  }

  set partner(partner: Partner) {
    if(partner) {
      this.partnerSource.next(partner);
    }
  }
}
