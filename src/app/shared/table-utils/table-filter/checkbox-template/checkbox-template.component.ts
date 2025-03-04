import { AfterViewInit, Component, ElementRef, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { CheckboxValue, FilterObject } from '../../../../core/models/filterObj.entities';

@Component({
  selector: 'app-checkbox-template',
  imports: [
    CheckboxModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkbox-template.component.html',
  styleUrl: './checkbox-template.component.scss'
})
export class CheckboxTemplateComponent implements AfterViewInit {
    key: InputSignal<string> = input.required<string>();
    name: InputSignal<string | undefined> = input<string | undefined>(undefined);
    color: InputSignal<string | null> = input.required<string | null>();
    initialValue: InputSignal<boolean> = input<boolean>(false);
    onCheckboxChange: OutputEmitterRef<CheckboxValue> = output<CheckboxValue>();

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit(): void {
        if (this.color() !== null) {
            this.el.nativeElement.style.setProperty('--p-checkbox-checked-background', this.color());
        }
    }

    onCheckboxClick(event: CheckboxChangeEvent): void {
        this.onCheckboxChange.emit(new CheckboxValue(this.key(), event.checked));
    }
}
