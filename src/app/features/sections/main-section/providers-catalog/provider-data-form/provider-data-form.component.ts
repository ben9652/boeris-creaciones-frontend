import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProvidersCatalogService } from '../providers-catalog.service';
import { ProvidersListService } from '../providers-list/providers-list.service';
import { DeviceTypeService } from '../../../../../core/services/device-type.service';
import { Category } from '../../../../../core/models/category.entities';
import { Provider } from '../../../../../core/models/provider.entities';
import { InputNumberModule } from 'primeng/inputnumber';
import { CategoryManagerComponent } from '../../../../../shared/category-manager/category-manager.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provider-data-form',
  standalone: true,
  imports: [
    CategoryManagerComponent,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './provider-data-form.component.html',
  styleUrl: './provider-data-form.component.scss',
  providers: [MessageService, TranslateService]
})
export class ProviderDataFormComponent {
  loading: boolean = false;
  
  constructor(
    public providersCatalogService: ProvidersCatalogService,
    public providersListService: ProvidersListService,
    private messageService: MessageService,
    private deviceTypeService: DeviceTypeService,
    private location: Location,
    public translateService: TranslateService
  ) {
    
  }

  updateProviderCategory(value: Category | null) {
    this.providersCatalogService.updateSelectedProvider('category', value);
    this.providersCatalogService.addPatchObject('replace', 'category', value);
  }

  categoryNameEdition(value: Category) {
    let currentProvider: Provider | null = this.providersCatalogService.selectedProvider();
    if(currentProvider)
      currentProvider.category = value;
  }

  updateProviderName(value: string) {
    let name: string | null;

    if(value.length === 0)
      name = null;
    else
      name = value;
    
    this.providersCatalogService.updateSelectedProvider('name', name);
    this.providersCatalogService.addPatchObject('replace', 'name', name);
  }

  updateProviderResidence(value: string) {
    let residence: string | null;
    
    if(value.length === 0)
      residence = null;
    else
      residence = value;
    
    this.providersCatalogService.updateSelectedProvider('residence', residence);
    this.providersCatalogService.addPatchObject('replace', 'residence', residence);
  }

  updateProviderPhone(value: number | null) {
    this.providersCatalogService.updateSelectedProvider('phone', value);
    this.providersCatalogService.addPatchObject('replace', 'phone', value);
  }

  updateProviderCVUorAlias(value: string) {
    let cvu_or_alias: string | null;
    
    if(value.length === 0)
      cvu_or_alias = null;
    else
      cvu_or_alias = value;
    
    this.providersCatalogService.updateSelectedProvider('cvu_or_alias', cvu_or_alias);
    this.providersCatalogService.addPatchObject('replace', 'cvu_or_alias', cvu_or_alias);
  }

  clickOnCancel() {
    if(this.deviceTypeService.isMobile()) {
      this.location.back();
    }
    this.providersCatalogService.selectedProvider.set(null);
    this.providersCatalogService.patchData.splice(0);
  }

  clickOnConfirm() {
    this.loading = true;

    const selectedProvider: Provider | null = this.providersCatalogService.selectedProvider();
    if(selectedProvider) {
      const isCategoryNull: boolean = selectedProvider.category === null;
      const isNameNull: boolean = selectedProvider.name === null;

      if(isCategoryNull || isNameNull) {
        this.loading = false;

        const nullField: boolean[] = [
          isCategoryNull,
          isNameNull
        ];
        this.throwWarningForEmptyFields(nullField);

        return;
      }
    }

    // Si se crea un nuevo proveedor
    if(this.providersCatalogService.selectedProvider()?.id === 0) {
      this.providersCatalogService.addNewProvider().subscribe({
        next: (response: Provider) => {
          this.providersListService.addProvider(response);
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.SUCCESSES.CREATED')
          });
          this.loading = false;
          if(this.deviceTypeService.isMobile()) {
            this.providersCatalogService.selectedProvider.set(null);
            this.location.back();
          }
          else {
            this.providersCatalogService.selectedProvider.set(response);
            this.providersCatalogService.selectedNonModifiedProvider = response;
          }
          this.providersListService.addProvider(response);
        },
        error: (e: HttpErrorResponse) => {
          const error = e.error;
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: error ? error.message : this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.ERRORS.FIELDS_LACK')
          });
          this.loading = false;
        }
      });
    }

    // Si se edita un proveedor
    else {
      const selectedId: number | undefined = this.providersCatalogService.selectedProvider()?.id;
      if(selectedId && this.providersCatalogService.patchData.length > 0) {
        this.providersCatalogService.editProvider(selectedId).subscribe({
          next: (response: Provider) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
              detail: this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.SUCCESSES.UPDATED')
            });
            this.providersCatalogService.patchData.splice(0);
            this.providersCatalogService.providerUpdated = true;
            this.loading = false;
            if(this.deviceTypeService.isMobile()) {
              this.providersCatalogService.selectedProvider.set(null);
              this.location.back();
            }
            else {
              this.providersCatalogService.selectedProvider.set(response);
              this.providersCatalogService.selectedNonModifiedProvider = response;
            }
            this.providersListService.editProvider(response.id, response);
          },
          error: (e: HttpErrorResponse) => {
            const error = e.error;
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
              detail: error ? error.message : this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.ERRORS.UPDATE')
            });
            this.loading = false;
          }
        })
      }
    }
  }

  private throwWarningForEmptyFields(nullField: boolean[]) {
    if(nullField[0]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.WARNINGS.FIELDS_LACK.CATEGORY')
      });
    }

    else if(nullField[1]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.WARNING'),
        detail: this.translateService.instant('SECTIONS.CATALOGS.PROVIDERS.WARNINGS.FIELDS_LACK.NAME')
      });
    }
  }
}
