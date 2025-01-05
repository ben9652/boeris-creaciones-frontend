import { ChangeDetectorRef, Component, input, InputSignal, OnChanges, output, OutputEmitterRef, SimpleChanges } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { LocalityModalComponent } from '../locality-modal/locality-modal.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { Locality } from '../../core/models/locality.entities';
import { LocalityManagerService } from './locality-manager.service';
import { SkeletonModule } from 'primeng/skeleton';
import { DeviceTypeService } from '../../core/services/device-type/device-type.service';

@Component({
    selector: 'app-locality-manager',
    imports: [
        SelectModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        InputTextModule,
        DialogModule,
        TranslateModule,
        ToastModule,
        SkeletonModule
    ],
    templateUrl: './locality-manager.component.html',
    styleUrl: './locality-manager.component.scss',
    providers: [TranslateService, DialogService, MessageService]
})
export class LocalityManagerComponent implements OnChanges {
  localities: Locality[] | null = null;
  loading: boolean = false;
  disabled: InputSignal<boolean> = input.required<boolean>();

  ref: DynamicDialogRef | undefined;

  locality: InputSignal<Locality | null | undefined> = input<Locality | null | undefined>();
  selectedLocality: Locality | null | undefined;

  ngModelChange: OutputEmitterRef<Locality | null> = output<Locality | null>();

  creationEvent: OutputEmitterRef<Locality | null> = output<Locality | null>();
  cancelationEvent: OutputEmitterRef<void> = output<void>();

  itemEdition: OutputEmitterRef<Locality> = output<Locality>();

  modalTitle: string = '';

  constructor(
    public translateService: TranslateService,
    public dialogService: DialogService,
    private messageService: MessageService,
    public deviceTypeService: DeviceTypeService,
    private localityManagerService: LocalityManagerService,
    private cdr: ChangeDetectorRef
  ) {
    localityManagerService.getLocalities().subscribe((response: Locality[]) => {
      this.localities = response;
      this.selectedLocality = this.locality();
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const locality: Locality | null | undefined = this.locality();
    
    if(locality) {
      const selectedLocality: Locality | null | undefined = this.localities?.find(localityElement => localityElement.id === locality.id);
      this.selectedLocality = selectedLocality;
    }
    else
      this.selectedLocality = null;
  }
  
  showModalLocality(editMode?: boolean) {
    if(editMode)
      this.modalTitle = this.translateService.instant('SHARED.LOCALITIES.TITLE.ON_EDITION');
    else
      this.modalTitle = this.translateService.instant('SHARED.LOCALITIES.TITLE.ON_CREATION');

    let modalData: {
      editMode: boolean,
      lastLocalityId: number,
      lastLocalityName: string
    };

    if(this.selectedLocality && editMode) {
      modalData = {
        editMode: true,
        lastLocalityId: this.selectedLocality.id,
        lastLocalityName: this.selectedLocality.name
      };
    }
    else {
      modalData = {
        editMode: false,
        lastLocalityId: 0,
        lastLocalityName: ''
      };
    }

    this.ref = this.dialogService.open(LocalityModalComponent, {
      header: this.modalTitle,
      width: '25rem',
      closable: true,
      closeOnEscape: true,
      data: modalData
    });

    this.ref.onClose.subscribe((response: Locality | string | null | undefined) => {
      if(response !== null && response !== undefined) {
        if(typeof response === 'string') {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: response || this.translateService.instant('SHARED.LOCALITIES.MESSAGES.FAILED')
          });
        }
        else if(editMode) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SHARED.LOCALITIES.MESSAGES.UPDATED')
          });
          let locality: Locality | null | undefined = this.localities?.find(locality => locality.id === this.selectedLocality?.id);
          if(locality)
            locality.name = response.name;
          this.selectedLocality = response;
          this.cdr.detectChanges();
          this.itemEdition.emit(response);
        }
        else {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SHARED.LOCALITIES.MESSAGES.CREATED')
          });
          this.localities?.push(response);
          this.selectedLocality = response;
        }
      }
    });
  }

  emitLocality(value: Locality | null) {
    this.selectedLocality = value;
    this.ngModelChange.emit(value);
  }
}
