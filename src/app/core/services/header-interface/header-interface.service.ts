import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterfaceService {
    selectedFilter: WritableSignal<number> = signal<number>(0);
    newElement: WritableSignal<number> = signal<number>(0);

    constructor() { }

    notifyNewElement() {
        this.newElement.update(value => value + 1);
    }

    notifyFilterSelected(option: number) {
        this.selectedFilter.update(value => option);
    }
}
