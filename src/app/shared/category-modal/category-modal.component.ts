import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Category } from '../../core/models/category.entities';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryManagerService } from '../category-manager/category-manager.service';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss',
  providers: [TranslateService]
})
export class CategoryModalComponent {
  loading: boolean = false;
  editMode: boolean = false;

  lastCategoryId: number = 0;
  lastCategoryName: string = '';

  categoryName: string = '';

  constructor(
    public translateService: TranslateService,
    public categoryManagerService: CategoryManagerService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.editMode = config.data.editMode;
    this.lastCategoryId = config.data.lastCategoryId;
    this.lastCategoryName = config.data.lastCategoryName;
    this.categoryName = this.lastCategoryName;
  }

  onKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.categoryName !== this.lastCategoryName) {
      this.onConfirm();
    }
  }

  onConfirm() {
    this.config.closable = false;
    this.config.closeOnEscape = false;
    
    this.loading = true;
    
    if(this.editMode) {
      this.categoryManagerService.edit(this.lastCategoryId, this.categoryName).subscribe({
        next: (response: Category) => {
          this.ref.close(response);
        },
        error: (e: HttpErrorResponse) => {
          this.ref.close(e.error.message);
        }
      });
    }
    else {
      const newCategory: Category = {
        id: 0,
        name: this.categoryName
      };
      this.categoryManagerService.create(newCategory).subscribe({
        next: (response: Category) => {
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
