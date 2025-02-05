import { Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { ItemPurchaseSummary } from '../../../../../../core/models/purchaseSummary.entities';
import { RawMaterialsDropdownComponent } from '../../../../../../shared/catalog-dropdowns/raw-materials-dropdown/raw-materials-dropdown.component';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { RawMaterial } from '../../../../../../core/models/rawMaterial.entities';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

export interface FieldRow {
  raw_material: RawMaterial | null;
  quantity: number;
  price: number;
  non_countable: boolean;
}

@Component({
  selector: 'app-step-two',
  imports: [
    RawMaterialsDropdownComponent,
    InputNumberModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    DialogModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {
  fieldsRow: ModelSignal<FieldRow[]> = model.required<FieldRow[]>();

  displayHelp: boolean = false;

  raw_material_category: InputSignal<number> = input.required<number>();
  
  onChanges: OutputEmitterRef<(ItemPurchaseSummary | null)[]> = output<(ItemPurchaseSummary | null)[]>();
  
  constructor() {
    
  }

  addRow() {
    this.fieldsRow().push({ raw_material: null, quantity: 0, price: 0, non_countable: false });
    this.onChanges.emit(this.updatedList());
  }
  
  removeLastRow() {
    this.fieldsRow().pop();
    this.onChanges.emit(this.updatedList());
  }

  toggleHelp(event: any) {
    this.displayHelp = !this.displayHelp;
  }

  updatedList(): (ItemPurchaseSummary | null)[] {
    return this.fieldsRow().map((field: FieldRow) => {
      let itemPurchaseSummary: ItemPurchaseSummary | null;
      if(
        (field.raw_material && field.raw_material.category && field.raw_material.name) &&
        field.price > 0
      ) {
        if (field.quantity === 0 && !field.non_countable)
          return null;
        
        itemPurchaseSummary = {
          raw_material_id: field.raw_material.id,
          category: field.raw_material.category,
          name: field.raw_material.name,
          quantity: field.non_countable ? 1 : field.quantity,
          unit_price: field.price
        }
      }
      else {
        itemPurchaseSummary = null;
      }

      return itemPurchaseSummary;
    });
  }
  
  updateRawMaterial(event: RawMaterial, row: FieldRow) {
    row.raw_material = event;
    this.onChanges.emit(this.updatedList());
  }

  updateQuantity(event: InputNumberInputEvent, row: FieldRow) {
    if(event.value === null)
      row.quantity = 0;
    else if(typeof event.value === 'number')
      row.quantity = event.value;

    this.onChanges.emit(this.updatedList());
  }

  updatePrice(event: InputNumberInputEvent, row: FieldRow) {
    if(event.value !== null && typeof event.value === 'number')
      row.price = event.value;
    else
      row.price = 0;

    this.onChanges.emit(this.updatedList());
  }

  updateNonCountable(event: CheckboxChangeEvent, row: FieldRow) {
    row.non_countable = event.checked;

    this.onChanges.emit(this.updatedList());
  }
}
