import { afterRender, Component, effect, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { Partner } from '../../../../../core/models/partner.entities';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of, shareReplay, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ListPartnersService } from './list-partners.service';
import { InputTextModule } from 'primeng/inputtext';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnersService } from '../partners.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-list-partners',
    imports: [
        ScrollerModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        TranslateModule,
        SkeletonModule,
        ToastModule
    ],
    templateUrl: './list-partners.component.html',
    styleUrl: './list-partners.component.scss',
    providers: [MessageService]
})
export class ListPartnersComponent {
  partnerSearch: string = '';

  existingPartners: Partner[] = [];
  visibleExistingPartners: Partner[] = [];

  partnersSubscription?: Subscription;

  isLoading: boolean = true;

  constructor(
    private listPartnersService: ListPartnersService,
    private partnersService: PartnersService,
    private deviceTypeService: DeviceTypeService,
    private router: Router,
    public translateService: TranslateService,
    private messageService: MessageService
  ) {
    listPartnersService.askForPartners().subscribe({
      next: (partners: Partner[]) => {
        listPartnersService.setPartners(partners);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'No tenés permisos para ver los socios'});
        }
        else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al cargar los socios'});
        }
        this.isLoading = false;
      }
    });
    effect(() => {
      const partners: Partner[] | null = this.listPartnersService.getPartners();
      if(partners !== null) {
        this.existingPartners = partners;
        this.visibleExistingPartners = partners;
        this.isLoading = false;
      }
    })
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
