import { Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { SearchObject } from '../../../../core/models/searchObj.entities';
import { RadioButton, RadioButtonClickEvent } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  imports: [
    RadioButton,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit {
  filters: InputSignal<SearchObject[]> = input.required<SearchObject[]>();
  initialKey: InputSignal<string> = input.required<string>();
  vertical: InputSignal<boolean> = input<boolean>(true);
  gap: InputSignal<string> = input<string>('0px');
  
  onFilterSelect: OutputEmitterRef<string> = output<string>();
  selectedFilter: string = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.filters().length > 0) {
      this.selectedFilter = this.filters()[0].key;
    }
  }

  onFilterChange(event: RadioButtonClickEvent): void {
    console.log(event);
    this.selectedFilter = event.value;
    this.onFilterSelect.emit(event.value);
  }
}
