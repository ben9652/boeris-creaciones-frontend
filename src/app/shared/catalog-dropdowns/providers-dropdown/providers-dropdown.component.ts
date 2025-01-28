import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
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
export class ProvidersDropdownComponent {
  groupedProviders: SelectItemGroup[] | null = null;

  getProvider: OutputEmitterRef<Provider> = output<Provider>();

  disabled: InputSignal<boolean> = input<boolean>(false);

  constructor(
    private providersService: ProvidersService,
    public translateService: TranslateService
  ) {
    providersService
      .getProvidersFromDatabase()
      .subscribe((providers: SelectItemGroup[]) => {
        providersService.providers.set(providers);
        this.groupedProviders = providers;
      });
  }

  onSelection(event: SelectChangeEvent) {
    this.getProvider.emit(event.value);
  }
}
