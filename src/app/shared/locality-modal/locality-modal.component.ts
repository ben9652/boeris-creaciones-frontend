import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalityManagerService } from '../locality-manager/locality-manager.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Locality } from '../../core/models/locality.entities';

@Component({
    selector: 'app-locality-modal',
    imports: [
        TranslateModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './locality-modal.component.html',
    styleUrl: './locality-modal.component.scss'
})
export class LocalityModalComponent {
  loading: boolean = false;
  editMode: boolean = false;

  lastLocalityId: number = 0;
  lastLocalityName: string = '';

  localityName: string = '';

  constructor(
    public translateService: TranslateService,
    public localityManagerService: LocalityManagerService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.editMode = config.data.editMode;
    this.lastLocalityId = config.data.lastLocalityId;
    this.lastLocalityName = config.data.lastLocalityName;
    this.localityName = this.lastLocalityName;
  }

  onKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.localityName !== this.lastLocalityName)
      this.onConfirm();
  }

  onConfirm() {
    this.config.closable = false;
    this.config.closeOnEscape = false;

    this.loading = true;

    if(this.editMode) {
      this.localityManagerService.edit(this.lastLocalityId, this.localityName).subscribe({
        next: (response: Locality) => {
          this.ref.close(response);
        },
        error: (e: HttpErrorResponse) => {
          this.ref.close(e.error.message);
        }
      });
    }
    else {
      const newLocality: Locality = {
        id: 0,
        name: this.localityName,
        province: {
          id: 1,
          name: ''
        }
      };
      this.localityManagerService.create(newLocality).subscribe({
        next: (response: Locality) => {
          this.ref.close(response);
        },
        error: (e: HttpErrorResponse) => {
          this.ref.close(e.error.message);
        }
      });
    }
  }

  onCancel() {
    this.ref.close(null);
  }
}
