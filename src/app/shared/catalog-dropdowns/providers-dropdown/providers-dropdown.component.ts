import { Component, output, OutputEmitterRef } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { ProviderBase } from '../../../core/models/provider.entities';
import { ProvidersService } from '../../../core/services/catalogs/providers.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-providers-dropdown',
    imports: [
        DropdownModule,
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

  onSelection(event: DropdownChangeEvent) {
    this.getProvider.emit(event.value);
  }
}
