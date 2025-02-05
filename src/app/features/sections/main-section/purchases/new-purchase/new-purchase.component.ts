import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepOneComponent } from './step-one/step-one.component';
import { FieldRow, StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NewPurchase, Purchase } from '../../../../../core/models/purchase.entities';
import { areProvidersEqual, createNullProvider, Provider } from '../../../../../core/models/provider.entities';
import { ItemPurchaseSummary } from '../../../../../core/models/purchaseSummary.entities';
import { NewPurchaseStepOne, NewPurchaseStepThree } from '../../../../../core/models/purchaseStepsObjects.entities';
import { User } from '../../../../../core/models/user.entities';
import { PurchasesService } from '../purchases.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-purchase',
  imports: [
    StepperModule,
    ButtonModule,
    TranslateModule,
    ToastModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  templateUrl: './new-purchase.component.html',
  styleUrl: './new-purchase.component.scss',
  providers: [ MessageService ]
})
export class NewPurchaseComponent {
  /*** Campos de los diferentes pasos ***/
  // Campos del primer paso
  description: string = '';
  previousProvider: Provider = createNullProvider();
  provider: Provider = createNullProvider();

  // Campos del segundo paso
  fieldsRows: FieldRow[] = [
    { raw_material: null, quantity: 0, price: 0, non_countable: false }
  ];
  raw_materials: (ItemPurchaseSummary | null)[] = [];

  // Campo del tercer paso
  delivery_note: NewPurchaseStepThree;

  // Arreglo para el cuarto paso
  purchased_raw_materials: ItemPurchaseSummary[] = [];

  /**************************************/

  user: User | null;

  disableStep2: boolean = true;
  disableStep3: boolean = true;

  loading: boolean = false;

  constructor(
    private purchasesService: PurchasesService,
    public translateService: TranslateService,
    private location: Location,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = purchasesService.getUser();
    this.delivery_note = new NewPurchaseStepThree('ARS', 'T', 'B');
  }

  receiveStepOne(stepOne: NewPurchaseStepOne) {
    const providersEqual: boolean = areProvidersEqual(this.previousProvider, stepOne.provider);
    if (!providersEqual) {
      if (this.previousProvider.category?.id !== stepOne.provider.category?.id) {
        this.fieldsRows = [ { raw_material: null, quantity: 0, price: 0, non_countable: false } ];
      }

      this.previousProvider = stepOne.provider;
    }

    if (!this.description || this.provider.id === 0) {
      this.disableStep2 = true;
    }
    else {
      this.disableStep2 = false;
    }
  }

  receiveStepTwo(stepTwo: (ItemPurchaseSummary | null)[]) {
    this.raw_materials = stepTwo;

    if (this.raw_materials.some(item => item === null)) {
      this.disableStep3 = true;
    }
    else {
      this.disableStep3 = false;
      this.purchased_raw_materials = this.raw_materials.filter(item => item !== null) as ItemPurchaseSummary[];
    }
  }

  receiveStepThree(stepThree: NewPurchaseStepThree) {
    this.delivery_note = stepThree;
  }

  savePurchase() {
    this.loading = true;
    
    if (this.user && this.provider) {
      const budget: number = this.raw_materials.reduce((acc, item) => {
        if (!item) {
          return acc;
        }
        
        return acc + item.quantity * item.unit_price
      }, 0);

      this.purchased_raw_materials = this.raw_materials.filter(item => item !== null) as ItemPurchaseSummary[];

      const newPurchase: NewPurchase = new NewPurchase(
        this.purchased_raw_materials,
        this.provider,
        this.user,
        this.delivery_note.currency,
        this.delivery_note.paymentMethod,
        this.delivery_note.receptionMode,
        this.description
      );
      
      this.purchasesService.createPurchase(newPurchase).subscribe({
        next: (purchase: Purchase) => {
          this.purchasesService.addPurchase(purchase);
          this.messageService.add({severity: 'success', summary: 'Compra creada', detail: 'La compra se ha creado correctamente'});
          this.loading = false;
          this.location.back();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message});
          this.loading = false;
        }
      })
    }
  }
}