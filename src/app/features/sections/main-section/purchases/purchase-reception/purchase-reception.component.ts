import { AfterViewInit, Component, input, InputSignal, model, ModelSignal, OnInit, output, OutputEmitterRef, ViewChild } from '@angular/core';
import { BranchesDropdownComponent } from '../../../../../shared/catalog-dropdowns/branches-dropdown/branches-dropdown.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Branch } from '../../../../../core/models/branch.entities';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ReceptionObject } from '../../../../../core/models/receptionObject.entities';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumber, InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
  selector: 'app-purchase-reception',
  imports: [
    BranchesDropdownComponent,
    ButtonModule,
    TranslateModule,
    FileUploadModule,
    InputTextModule,
    InputNumber,
    FormsModule
  ],
  templateUrl: './purchase-reception.component.html',
  styleUrl: './purchase-reception.component.scss',
  providers: [TranslateService]
})
export class PurchaseReceptionComponent implements OnInit {
  finalPrice: InputSignal<number> = input.required<number>();
  
  selectedBranch: Branch | null = null;
  additionalAmount: number = 0;

  additionalAmountReason: string | null = null;
  invoice: File | null = null;

  isLoading: ModelSignal<boolean> = model.required<boolean>();

  onCancelEvent: OutputEmitterRef<void> = output<void>();
  onAcceptEvent: OutputEmitterRef<{ reception: ReceptionObject, invoice: File | null, branch: Branch }> = output<{ reception: ReceptionObject, invoice: File | null, branch: Branch }>();
  
  fieldsLack: boolean = false;

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;
  
  constructor(
    public translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.additionalAmount = this.finalPrice();
  }
  
  onBranchSelected(branch: Branch) {
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
    
    if(this.selectedBranch !== null) {
      receptionObject = {
        id_branch_reception: this.selectedBranch.id,
        additional_amount: this.additionalAmount,
        additional_amount_reason: this.additionalAmountReason,
        invoice: null
      };
      
      this.onAcceptEvent.emit({
        reception: receptionObject,
        invoice: this.invoice,
        branch: this.selectedBranch
      });
    }
    else {
      this.fieldsLack = true;
    }
  }
}
