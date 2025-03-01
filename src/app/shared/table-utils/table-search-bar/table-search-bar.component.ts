import { AfterViewInit, Component, input, InputSignal, output, OutputEmitterRef, ViewChild } from '@angular/core';
import { SearchObject } from '../../../core/models/searchObj.entities';
import { RadioButton } from 'primeng/radiobutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Popover, PopoverModule } from 'primeng/popover';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SearchFilterComponent } from './search-filter/search-filter.component';

@Component({
  selector: 'app-table-search-bar',
  imports: [
    ButtonModule,
    RadioButton,
    FloatLabelModule,
    PopoverModule,
    InputTextModule,
    TranslateModule,
    SearchFilterComponent
  ],
  templateUrl: './table-search-bar.component.html',
  styleUrl: './table-search-bar.component.scss'
})
export class TableSearchBarComponent {
  filters: InputSignal<SearchObject[]> = input.required<SearchObject[]>();
  initialFilter: InputSignal<string> = input.required<string>();

  onKeyDown: OutputEmitterRef<string> = output<string>();
  onFilterSelect: OutputEmitterRef<string> = output<string>();

  @ViewChild('op') op!: Popover;
  
  constructor() {

  }

  onWrite(event: KeyboardEvent): void {
    if((event.key.length === 1 || event.key === 'Backspace') && !event.ctrlKey && !event.metaKey && !event.altKey && !event.isComposing) {
      if (event.key !== 'Shift') {
        this.onKeyDown.emit(event.key);
      }
    }
  }

  onFilterChange(selectedFilter: string): void {
    this.onFilterSelect.emit(selectedFilter);
    this.op.hide();
  }
}
