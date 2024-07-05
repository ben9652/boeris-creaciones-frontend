import { Component, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { Partner, PartnerRegister } from '../../../../../core/models/partner.entities';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-partner-addition',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './partner-addition.component.html',
  styleUrl: './partner-addition.component.scss'
})
export class PartnerAdditionComponent {
  firstName: string = '';
  lastName?: string;
  email: string = '';

  isLoading: ModelSignal<boolean> = model.required<boolean>();

  onPartnerCreation: OutputEmitterRef<PartnerRegister | null> = output<PartnerRegister | null>();
  
  constructor() {
    
  }

  createPartner() {
    if(this.firstName !== '' && this.lastName && this.email !== '') {
      this.isLoading.set(true);
      let partnersFields: PartnerRegister = new PartnerRegister(this.firstName, this.email, this.lastName);
      this.onPartnerCreation.emit(partnersFields);
    }
  }
}
