import { Component, output, OutputEmitterRef, ViewChild } from '@angular/core';
import { BranchesDropdownComponent } from '../../../../../shared/catalog-dropdowns/branches-dropdown/branches-dropdown.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BranchBase } from '../../../../../core/models/branch.entities';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ReceptionObject } from '../../../../../core/models/receptionObject.entities';

@Component({
  selector: 'app-purchase-reception',
  imports: [
    BranchesDropdownComponent,
    ButtonModule,
    TranslateModule,
    FileUploadModule
  ],
  templateUrl: './purchase-reception.component.html',
  styleUrl: './purchase-reception.component.scss',
  providers: [TranslateService]
})
export class PurchaseReceptionComponent {
  selectedBranch: BranchBase | null = null;
  invoice: File | null = null;

  onCancelEvent: OutputEmitterRef<void> = output<void>();
  onAcceptEvent: OutputEmitterRef<ReceptionObject> = output<ReceptionObject>();

  fieldsLack: boolean = false;

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;
  
  constructor(
    public translateService: TranslateService
  ) {

  }

  onBranchSelected(branch: BranchBase) {
    this.selectedBranch = branch;
  }

  onInvoiceLoading(event: any) {
    const file: File = event.currentFiles[0];
    
    this.invoice = file;
    this.fileUploadComponent.clear();
  }

  onCancel() {
    this.onCancelEvent.emit();
  }

  onAccept() {
    let receptionObject: ReceptionObject | null = null;

    console.log('Hola');
    
    if(this.selectedBranch !== null) {
      receptionObject = {
        branch: this.selectedBranch,
        invoice: this.invoice
      };
      
      this.onAcceptEvent.emit(receptionObject);
    }
    else {
      this.fieldsLack = true;
    }

    console.log('Objeto de recepción: ', receptionObject);
  }
}
