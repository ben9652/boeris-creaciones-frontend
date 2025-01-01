import { Component, output, OutputEmitterRef } from '@angular/core';
import { Partner, PartnerRegister } from '../../../../../core/models/partner.entities';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ListPartnersService } from '../list-partners/list-partners.service';
import { PartnersService } from '../partners.service';
import { Location } from '@angular/common';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-partner-addition',
    imports: [
        InputTextModule,
        ButtonModule,
        FormsModule,
        ToastModule,
        ConfirmDialogModule,
        TranslateModule
    ],
    templateUrl: './partner-addition.component.html',
    styleUrl: './partner-addition.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class PartnerAdditionComponent {
  firstName: string = '';
  lastName?: string;
  email: string = '';

  isLoading: boolean = false;;
  
  onPartnerCreation: OutputEmitterRef<void> = output<void>();
  
  isMobile: boolean = false;
  
  constructor(
    private listPartnersService: ListPartnersService,
    private partnersService: PartnersService,
    private location: Location,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public translateService: TranslateService
  ) {

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.isMobile = sessionStorage.getItem('isMobile') !== null ? true : false;
  }

  createPartner() {
    if(this.firstName !== '' && this.lastName && this.email !== '') {
      this.isLoading = true;
      let partnersFields: PartnerRegister = new PartnerRegister(this.firstName, this.email, this.lastName);
      this.listPartnersService.registerPartner(partnersFields).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 401 || error.status === 403) {
            let newPartner: Partner | null = {
              id_user: 0,
              username: partnersFields._firstName + partnersFields._lastName,
              lastName: partnersFields._lastName,
              firstName: partnersFields._firstName,
              email: partnersFields._email,
              role: 's',
              partnerRoles: []
            }

            return of<Partner>(newPartner);
          }
          return throwError(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.mensaje
            });
            this.isLoading = false;
            return error;
          });
        })
      )
      .subscribe((newPartner: Partner | null) => {
        if(newPartner) {
          this.listPartnersService.addPartner(newPartner);
          this.partnersService.partner = newPartner;
        }
        this.confirmationService.confirm({
          header: this.translateService.instant('SECTIONS.PARTNERS.PARTNER_ADDITION.CONFIRMATION.HEADER'),
          message: newPartner?.username,
          accept: () => {
            this.onPartnerCreation.emit();
            if(this.isMobile) {
              this.location.back();
            }
            this.isLoading = false;
          },
          reject: () => {
            this.onPartnerCreation.emit();
            if(this.isMobile) {
              this.location.back();
            }
            this.isLoading = false;
          }
        })
      })
    }
  }

  clickOnCancel() {
    this.onPartnerCreation.emit();
    if(this.isMobile) {
      this.location.back();
    }
  }

  onKeyPressed(event: KeyboardEvent) {
    if(event.key === 'Enter' && !this.isLoading) {
      this.createPartner();
    }
  }

  confirm() {
    
  }
}
