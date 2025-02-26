import { Component, ModelSignal, model, output, OutputEmitterRef, input, InputSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DiscardObject } from '../../core/models/discardObject.entities';

@Component({
  selector: 'app-objects-discarder',
  imports: [
    ButtonModule,
    TranslateModule,
    RadioButtonModule,
    InputNumberModule,
    FormsModule
  ],
  templateUrl: './objects-discarder.component.html',
  styleUrl: './objects-discarder.component.scss',
  providers: [TranslateService]
})
export class ObjectsDiscarderComponent {
  stock: InputSignal<number> = input.required<number>();

  isLoading: ModelSignal<boolean> = model.required<boolean>();
  reason: string = "";
  quantity: number = 0;

  reasonsLack: boolean = false;
  quantityCero: boolean = false;
  quantityExceeds: boolean = false;

  onCancelEvent: OutputEmitterRef<void> = output<void>();
  onAcceptEvent: OutputEmitterRef<DiscardObject> = output<DiscardObject>();

  constructor(public translateService: TranslateService) {

  }

  onReasonChange(){
    this.reasonsLack = false;
  }

  onQuantityChange(){
    this.quantityCero = false;
    this.quantityExceeds = false;
  }

  onCancel() {
    this.onCancelEvent.emit();
  }

  onAccept() {
    let discardObject: DiscardObject | null = null;
    if (this.reason === "" || this.reason === null) {
      this.reasonsLack = true;
    } else if (this.quantity === 0) {
      this.quantityCero = true;
    } else if (this.stock() < this.quantity) {
      this.quantityExceeds = true;
    } else {
      discardObject = new DiscardObject(this.reason, this.quantity);
      this.onAcceptEvent.emit(discardObject);
    }
  }
}
