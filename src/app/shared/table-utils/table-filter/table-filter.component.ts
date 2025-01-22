import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CheckboxValue, FilterObject } from '../../../core/models/filterObj.entities';
import { NgStyle } from '@angular/common';
import { CheckboxTemplateComponent } from './checkbox-template/checkbox-template.component';

@Component({
  selector: 'app-table-filter',
  imports: [
    CheckboxTemplateComponent,
    NgStyle
  ],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss'
})
export class TableFilterComponent {
  filters: InputSignal<FilterObject[]> = input.required<FilterObject[]>();
  vertical: InputSignal<boolean> = input<boolean>(false);
  gap: InputSignal<string> = input<string>('0px');
  onFilterChanges: OutputEmitterRef<string[]> = output<string[]>();

  selectedFilters: string[] = [];
  
  constructor() {}

  onCheckboxChanges(event: CheckboxValue): void {
    if (event.value) {
      this.selectedFilters.push(event.key);
    } else {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== event.key);
    }
    this.onFilterChanges.emit(this.selectedFilters);
  }
}
