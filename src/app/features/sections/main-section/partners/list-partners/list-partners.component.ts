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

  existingPartners?: Partner[];
  visibleExistingPartners: Partner[] = [];

  addingNewPartner: ModelSignal<boolean> = model.required<boolean>();

  private partnerCreatedEventSubscription?: Subscription;
  addedNewPartner: InputSignal<Observable<Partner>> = input.required<Observable<Partner>>();

  gotSelectedPartner: OutputEmitterRef<Partner> = output<Partner>();

  isMobile: boolean = false;

  constructor(
    private messageService: MessageService,
    private listPartnersService: ListPartnersService,
    private deviceTypeService: DeviceTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    listPartnersService.getPartners().pipe(
      map((partners: Partner[]) => partners),
      catchError((err) => {
        messageService.add({
          severity: 'error',
          summary: 'Denegado',
          detail: 'No estás autorizado a obtener los datos'
        })
        return of();
      })
    ).subscribe(
      (partners: Partner[]) => {
        this.existingPartners = partners;
        if(this.existingPartners) {
          this.visibleExistingPartners = this.existingPartners;
          this.gotSelectedPartner.emit(this.existingPartners[0]);
        }
      }
    );

    afterRender(() => {
      this.isMobile = deviceTypeService.isMobile();
    })
  }
  
  ngOnInit(): void {
    this.partnerCreatedEventSubscription = this.addedNewPartner().subscribe((partner: Partner) => {
      if(this.existingPartners) {
        this.existingPartners = [...this.existingPartners, partner];
        this.visibleExistingPartners = [...this.visibleExistingPartners, partner];
        this.searchPartner();
      }
    });
  }

  ngOnDestroy(): void {
    this.partnerCreatedEventSubscription?.unsubscribe();    
  }

  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   let addedPartner: Partner | undefined = this.addedNewPartner();
  //   console.log('Socio agregado: ', addedPartner);
  //   console.log('Socios existentes: ', this.existingPartners);
  //   if(addedPartner) {
  //     this.existingPartners?.push(addedPartner);
  //     this.visibleExistingPartners.push(addedPartner);
  //   }
  // }

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
    if(this.isMobile) {
      this.router.navigate(['roles', partner.id_user], { relativeTo: this.activatedRoute })
    }
    else {
      this.gotSelectedPartner.emit(partner);
    }
  }
}
