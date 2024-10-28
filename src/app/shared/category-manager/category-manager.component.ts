import { ChangeDetectorRef, Component, input, InputSignal, OnChanges, output, OutputEmitterRef, SimpleChanges } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CategoryManagerService } from './category-manager.service';
import { Category } from '../../core/models/category.entities';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { DeviceTypeService } from '../../core/services/device-type.service';
import { SkeletonModule } from 'primeng/skeleton';

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
    ToastModule,
    SkeletonModule
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

  category: InputSignal<Category | null | undefined> = input<Category | null | undefined>();
  selectedCategory: Category | null | undefined;

  ngModelChange: OutputEmitterRef<Category | null> = output<Category | null>();

  creationEvent: OutputEmitterRef<Category | null> = output<Category | null>();
  cancelationEvent: OutputEmitterRef<void> = output<void>();

  itemEdition: OutputEmitterRef<Category> = output<Category>();

  modalTitle: string = '';
  
  constructor(
    public translateService: TranslateService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private categoryManagerService: CategoryManagerService,
    private cdr: ChangeDetectorRef,
    public deviceTypeService: DeviceTypeService
  ) {
    categoryManagerService.getCategories().subscribe((response: Category[]) => {
      this.categories = response;
      this.selectedCategory = this.category();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const category: Category | null | undefined = this.category();

    if(category) {
      const selectedCategory: Category | null | undefined = this.categories.find(categoryElement => categoryElement.id === category.id);
      this.selectedCategory = selectedCategory;
    }
    else
      this.selectedCategory = null;
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
          if(category)
            category.name = response.name;
          this.selectedCategory = response;
          this.cdr.detectChanges();
          this.itemEdition.emit(response);
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
