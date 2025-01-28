import { Component } from '@angular/core';
import { StepOneComponent } from './step-one/step-one.component';
import { Provider } from '../../../../../core/models/provider.entities';

@Component({
  selector: 'app-new-purchase',
  imports: [
    StepOneComponent
  ],
  templateUrl: './new-purchase.component.html',
  styleUrl: './new-purchase.component.scss'
})
export class NewPurchaseComponent {
  description: string = '';
  provider: Provider | null = null;
}
