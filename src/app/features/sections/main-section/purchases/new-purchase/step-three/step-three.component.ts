import { Component, output, OutputEmitterRef } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RadioButtonClickEvent, RadioButton } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPurchaseStepThree } from '../../../../../../core/models/purchaseStepsObjects.entities';

@Component({
  selector: 'app-step-three',
  imports: [
    RadioButton,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ],
  standalone: true,
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  currency: string = 'ARS';
  paymentMethod: 'T' | 'E' = 'T';
  receptionMode: 'B' | 'E' = 'B';

  onChange: OutputEmitterRef<NewPurchaseStepThree> = output<NewPurchaseStepThree>();

  constructor(
    public translateService: TranslateService
  ) {

  }

  onFieldsChanges(event: RadioButtonClickEvent) {
    this.onChange.emit(new NewPurchaseStepThree(this.currency, this.paymentMethod, this.receptionMode));
  }
}
