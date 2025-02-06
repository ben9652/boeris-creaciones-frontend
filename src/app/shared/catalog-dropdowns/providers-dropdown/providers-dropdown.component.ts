import { Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { Provider } from '../../../core/models/provider.entities';
import { ProvidersService } from '../../../core/services/catalogs/providers.service';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-providers-dropdown',
  imports: [SelectModule, FormsModule, SkeletonModule],
  templateUrl: './providers-dropdown.component.html',
  styleUrl: './providers-dropdown.component.scss',
  providers: [TranslateService],
})
export class ProvidersDropdownComponent implements OnInit {
  groupedProviders: SelectItemGroup<Provider>[] | null = null;
  selectedProvider: Provider | null = null;

  getProvider: OutputEmitterRef<Provider> = output<Provider>();

  disabled: InputSignal<boolean> = input<boolean>(false);

  categoriesIds: InputSignal<number[]> = input<number[]>([]);

  initialSelection: InputSignal<Provider | null> = input<Provider | null>(null);

  constructor(
    private providersService: ProvidersService,
    public translateService: TranslateService
  ) {
  }
  
  ngOnInit(): void {
    this.providersService.getProvidersFromDatabase(this.categoriesIds()).subscribe((providers: SelectItemGroup<Provider>[]) => {
      this.providersService.providers.set(providers);
      this.groupedProviders = providers;
      
      const initialSelection: Provider | null = this.initialSelection();
      if (initialSelection) {
        this.groupedProviders = this.groupedProviders.map((group: SelectItemGroup<Provider>) => {
          group.items = group.items.map((item) => {
            if (item.value === initialSelection) {
              this.selectedProvider = initialSelection;
            }
            return item;
          });
          return group;
        });
      }
    });
  }

  onSelection(event: SelectChangeEvent) {
    this.getProvider.emit(event.value);
  }
}
