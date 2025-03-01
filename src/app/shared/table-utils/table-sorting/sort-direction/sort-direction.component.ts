import { Component, InputSignal, input, ModelSignal, model, OutputEmitterRef, output, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-direction',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './sort-direction.component.html',
  styleUrl: './sort-direction.component.scss'
})
export class SortDirectionComponent {
    ascendingSort: InputSignal<ModelSignal<boolean>> = input.required<ModelSignal<boolean>>();
    sortDirectionIcon: string = 'fas fa-arrow-down-a-z fa-xl';

    // Este es el tipo de dato que se espera para el icono de la dirección de ordenamiento.
    // 1: significa que es ordenación alfabética.
    // 2: significa que es ordenación por fecha.
    // 3: significa que es ordenación por número.
    dataType: ModelSignal<string> = model.required<string>();

    changingDirection: boolean = false;

    constructor() {
        effect(() => {
            this.updateIcon(this.dataType());
        });
    }

    private updateIcon(dataType: string): void {
        const ascendingSort: boolean = this.ascendingSort()();
        if (dataType === '1') {
            this.sortDirectionIcon = ascendingSort ? 'fas fa-arrow-down-a-z fa-xl' : 'fas fa-arrow-up-a-z fa-xl';
        } else if (dataType === '3') {
            this.sortDirectionIcon = ascendingSort ? 'fas fa-arrow-down-1-9 fa-xl' : 'fas fa-arrow-up-1-9 fa-xl';
        }
        else {
            this.sortDirectionIcon = ascendingSort ? 'fas fa-arrow-down-a-z fa-xl' : 'fas fa-arrow-up-a-z fa-xl';
        }
    }

    toggleSortDirection() {
        let animationDuration: number = 200;
        this.changingDirection = true;

        setTimeout(() => {
            this.changingDirection = false;
        }, animationDuration);

        setTimeout(() => {
            this.ascendingSort().update(current => !current);
            this.updateIcon(this.dataType());
        }, animationDuration / 2.0);
    }
}
