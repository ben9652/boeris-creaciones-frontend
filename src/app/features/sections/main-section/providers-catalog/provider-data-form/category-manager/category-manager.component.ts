import { Component, input, InputSignal, OnChanges, output, OutputEmitterRef, SimpleChanges } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../../../../../core/models/category.entities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryModalComponent } from '../../../../../../shared/category-modal/category-modal.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CategoryManagerService } from './category-manager.service';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [
    DropdownModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    DialogModule,
    TranslateModule,
    ToastModule
  ],
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.scss',
  providers: [TranslateService, DialogService, MessageService]
})
export class CategoryManagerComponent {
  categories: Category[] = [];
  loading: boolean = false;
  disabled: InputSignal<boolean> = input.required<boolean>();

  ref: DynamicDialogRef | undefined;

  category: InputSignal<Category | null | undefined> = input.required<Category | null | undefined>();
  selectedCategory: Category | null | undefined;

  ngModelChange: OutputEmitterRef<Category | null> = output<Category | null>();

  creationEvent: OutputEmitterRef<Category | null> = output<Category | null>();
  cancelationEvent: OutputEmitterRef<void> = output<void>();

  modalTitle: string = '';
  
  constructor(
    public translateService: TranslateService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private categoryManagerService: CategoryManagerService
  ) {
    categoryManagerService.getCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.selectedCategory = this.category();
  }
  
  showModalCategory(editMode?: boolean) {
    if(editMode)
      this.modalTitle = this.translateService.instant('SHARED.CATEGORIES.TITLE.ON_EDITION');
    else
      this.modalTitle = this.translateService.instant('SHARED.CATEGORIES.TITLE.ON_CREATION');

    let modalData: {
      editMode: boolean,
      lastCategoryId: number,
      lastCategoryName: string
    };

    if(this.selectedCategory && editMode) {
      modalData = {
        editMode: true,
        lastCategoryId: this.selectedCategory.id,
        lastCategoryName: this.selectedCategory.name
      };
    }
    else {
      modalData = {
        editMode: false,
        lastCategoryId: 0,
        lastCategoryName: ''
      };
    }
    
    this.ref = this.dialogService.open(CategoryModalComponent, {
      header: this.modalTitle,
      width: '25rem',
      closable: true,
      closeOnEscape: true,
      data: modalData
    });

    this.ref.onClose.subscribe((response: Category | string | null | undefined) => {
      if(response !== null && response !== undefined) {
        if(typeof response === 'string') {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.FAILED'),
            detail: response || this.translateService.instant('SHARED.CATEGORIES.MESSAGES.FAILED')
          });
        }
        else if(editMode) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SHARED.CATEGORIES.MESSAGES.UPDATED')
          });
          let category: Category | null | undefined = this.categories.find(category => category.id === this.selectedCategory?.id);
          if(category) {
            category.name = response.name;
          }
          this.selectedCategory = response;
        }
        else {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SHARED.MESSAGES.SUMMARY.SUCCESS'),
            detail: this.translateService.instant('SHARED.CATEGORIES.MESSAGES.CREATED')
          });
          this.categories.push(response);
          this.selectedCategory = response;
        }
      }
    });
  }

  emitCategory(value: Category | null) {
    this.selectedCategory = value;
    this.ngModelChange.emit(value);
  }
}
