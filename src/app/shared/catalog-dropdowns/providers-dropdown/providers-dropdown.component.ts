import { Component, output, OutputEmitterRef } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { ProviderBase } from '../../../core/models/provider.entities';
import { ProvidersService } from '../../../core/services/catalogs/providers.service';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-providers-dropdown',
    imports: [
        SelectModule,
        FormsModule,
        SkeletonModule
    ],
    templateUrl: './providers-dropdown.component.html',
    styleUrl: './providers-dropdown.component.scss'
})
export class ProvidersDropdownComponent {
  groupedProviders: SelectItemGroup[] | null = null;

  getProvider: OutputEmitterRef<ProviderBase> = output<ProviderBase>();

  constructor(
    private providersService: ProvidersService
  ) {
    providersService.getProvidersFromDatabase().subscribe((providers: SelectItemGroup[]) => {
      providersService.providers.set(providers);
      this.groupedProviders = providers;
    });
  }

  onSelection(event: SelectChangeEvent) {
    this.getProvider.emit(event.value);
  }
}
