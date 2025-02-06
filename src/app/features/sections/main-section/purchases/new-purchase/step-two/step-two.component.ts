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
import { DeviceTypeService } from '../../../../../../core/services/device-type/device-type.service';
import { DividerModule } from 'primeng/divider';
import { Category } from '../../../../../../core/models/category.entities';

export interface FieldRow {
  raw_material: RawMaterial | null;
  quantity: number | null;
  price: number | null;
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
    DividerModule,
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
  
  constructor(
    public deviceTypeService: DeviceTypeService
  ) {
    
  }

  addRow() {
    this.fieldsRow().push({ raw_material: null, quantity: null, price: null, non_countable: false });
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

      const raw_material: RawMaterial | null = field.raw_material;
      const raw_material_category: Category | null = raw_material ? raw_material.category : null;
      const raw_material_name: string | null = raw_material ? raw_material.name : null;
      const price: number | null = field.price;
      const quantity: number | null = field.quantity;

      if (raw_material === null)
        return null;

      if (raw_material_category === null)
        return null;

      if (raw_material_name === null)
        return null;

      if (price === null || price <= 0)
        return null;

      if (quantity === null && !field.non_countable)
        return null;
      
      if (quantity === 0 && !field.non_countable)
        return null;
      
      itemPurchaseSummary = {
        raw_material_id: raw_material.id,
        category: raw_material_category,
        name: raw_material_name,
        quantity: field.non_countable ? 0 : (quantity ? quantity : 0),   // Mandando 0 de cantidad será la señal de que es una materia prima no contable
        unit_price: price
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
