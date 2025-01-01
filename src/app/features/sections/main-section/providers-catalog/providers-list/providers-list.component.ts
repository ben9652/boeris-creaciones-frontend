import { Component, effect, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { areProvidersEqual, createNullProvider, createProviderRow, Provider, ProviderRow } from '../../../../../core/models/provider.entities';
import { ProvidersCatalogService } from '../providers-catalog.service';
import { ProvidersListService } from './providers-list.service';
import { DeviceTypeService } from '../../../../../core/services/device-type/device-type.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-providers-list',
    imports: [
        ButtonModule,
        TableModule,
        SkeletonModule,
        TranslateModule
    ],
    templateUrl: './providers-list.component.html',
    styleUrl: './providers-list.component.scss',
    providers: [
        TranslateService
    ]
})
export class ProvidersListComponent implements OnInit {
  providersMap: Map<number, ProviderRow> = new Map<number, ProviderRow>();
  
  constructor(
    public providersCatalogService: ProvidersCatalogService,
    public providersListService: ProvidersListService,
    private deviceTypeService: DeviceTypeService,
    private router: Router,
    public translateService: TranslateService
  ) {
    effect(() => {
      const selectedProvider: Provider | null = providersCatalogService.selectedProvider();
      if(selectedProvider !== null) {
        let actualProvider: ProviderRow | undefined = this.providersMap.get(selectedProvider.id);

        // Si el proveedor no es indefinido significa que seleccionamos un proveedor de la lista
        if(actualProvider) {
          actualProvider.modified = selectedProvider;

          // Si el proveedor sufrió una modificación en la base de datos
          if(!providersCatalogService.nonModified && providersCatalogService.providerUpdated) {
            actualProvider.nonModified = selectedProvider;
            actualProvider.modified = selectedProvider;
            providersCatalogService.providerUpdated = false;
            providersCatalogService.nonModified = true;
          }
          else {
            
          }
        }

        // Si es indefinido, significa que no se encuentra en la lista
        else {
          // Si su ID es mayor a 0, significa que agregamos el producto
          if(selectedProvider.id !== 0) {
            this.providersMap.set(selectedProvider.id, createProviderRow(selectedProvider, selectedProvider));
          }
        }
      }

      // Si se apretó el botón de cancelar, es decir, si el proveedor seleccionado es nulo
      else if(providersCatalogService.selectedNonModifiedProvider) {
        const id: number = providersCatalogService.selectedNonModifiedProvider.id;

        let providerRowNoAffected: ProviderRow | undefined = this.providersMap.get(id);
        if(providerRowNoAffected) {
          const nonModifiedProvider: Provider = providerRowNoAffected.nonModified;
          providerRowNoAffected.modified = nonModifiedProvider;
          providersCatalogService.selectedNonModifiedProvider = null;
          providersCatalogService.nonModified = true;
        }
      }
    })
  }

  ngOnInit(): void {
    this.providersListService.getProvidersFromDatabase().subscribe((response: Provider[]) => {
      this.providersListService.providers.set(response);
      response.forEach((provider: Provider) => {
        this.providersMap.set(provider.id, createProviderRow(provider, provider));
      });
    });
  }

  getProvidersList(): ProviderRow[] {
    const providerRows: ProviderRow[] = Array.from(this.providersMap.values());
    return providerRows;
  }

  youAreAdding(): boolean {
    return this.providersCatalogService.selectedProvider()?.id === 0;
  }

  clickOnAddNewProvider() {
    this.providersCatalogService.selectedProvider.set(createNullProvider());
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['provider-addition']);
    }
  }

  clickOnProvider(provider: ProviderRow) {
    this.providersCatalogService.selectedNonModifiedProvider = provider.nonModified;
    this.providersCatalogService.selectedProvider.set(provider.modified);
    this.providersCatalogService.nonModified = areProvidersEqual(provider.nonModified, provider.modified);
    if(this.deviceTypeService.isMobile()) {
      this.router.navigate(['provider-edition']);
    }
  }
}
