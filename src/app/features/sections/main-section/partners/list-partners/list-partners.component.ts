import { afterRender, Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { Partner } from '../../../../../core/models/partner.entities';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ListPartnersService } from './list-partners.service';
import { InputTextModule } from 'primeng/inputtext';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnersService } from '../partners.service';

@Component({
  selector: 'app-list-partners',
  standalone: true,
  imports: [
    ScrollerModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './list-partners.component.html',
  styleUrl: './list-partners.component.scss'
})
export class ListPartnersComponent {
  partnerSearch: string = '';

  existingPartners: Partner[] = [];
  visibleExistingPartners: Partner[] = [];

  partnersSubscription?: Subscription;

  isLoading: boolean = false;

  constructor(
    private listPartnersService: ListPartnersService,
    private partnersService: PartnersService,
    private deviceTypeService: DeviceTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }
  
  ngOnInit(): void {
    this.partnersSubscription = this.listPartnersService.partners.subscribe((partners: Partner[]) => {
      this.existingPartners = partners;
      this.visibleExistingPartners = this.existingPartners;
      this.partnersService.partner = this.existingPartners[0];
      // this.isLoading = false;
      this.searchPartner();
    });
  }

  ngOnDestroy(): void {
    this.partnersSubscription?.unsubscribe();
  }

  private containsString(partner: string): boolean {
    let partnerLower: string = partner.toLowerCase();
    let contains: boolean = partnerLower.includes(this.partnerSearch.toLowerCase());
    return contains;
  }

  searchPartner() {
    if(this.existingPartners) {
      this.visibleExistingPartners = this.existingPartners.filter(res =>
        res.lastName ? 
          this.containsString(res.firstName) || this.containsString(res.lastName) :
          this.containsString(res.firstName)
      );
    }
  }

  clickOnPartner(partner: Partner) {
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['roles-edition'])
    }
    this.partnersService.partner = partner;
  }
}
