import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'app-table-sorting',
  imports: [
    TreeSelect,
    FormsModule,
    CommonModule
  ],
  templateUrl: './table-sorting.component.html',
  styleUrl: './table-sorting.component.scss'
})
export class TableSortingComponent implements OnInit {
  // Si se quiere encapsular las entradas de este componente, ayudarse con la interfaz SortingTreeObject
  possibleFilters: InputSignal<TreeNode<string>[]> = input.required<TreeNode<string>[]>();
  initialFilter: InputSignal<string> = input<string>('0-0');
  
  selectedNode: TreeNode<string> | null = null;

  // Aquí se guardará el icono de la dirección de la ordenación
  sortDirectionIcon?: string;

  ascendingSort: boolean = true;
  changingDirection: boolean = false;

  onSelectedFilter: OutputEmitterRef<string[]> = output<string[]>();
  onSortDirectionChange: OutputEmitterRef<boolean> = output<boolean>();
  
  constructor() {

  }

  private iconSelection(): void {
    if (this.selectedNode && this.selectedNode.parent) {
      // Si el nodo seleccionado tiene de tipo el número 1, signfica que es un nodo de ordenación alfabética
      // Si el nodo seleccionado tiene de tipo el número 2, signfica que es un nodo de ordenación por fecha
      // Si el nodo seleccionado tiene de tipo el número 3, signfica que es un nodo de ordenación por una magnitud numérica
      const parentType = this.selectedNode.parent.type;
      console.log(this.selectedNode);
      if(parentType == '1') {
        this.sortDirectionIcon = this.ascendingSort ? 'fas fa-arrow-down-a-z fa-xl' : 'fas fa-arrow-up-a-z fa-xl';        
      }
      else if(parentType == '3') {
        console.log('Hola')
        this.sortDirectionIcon = this.ascendingSort ? 'fas fa-arrow-down-1-9 fa-xl' : 'fas fa-arrow-up-1-9 fa-xl';
      }
    }
  }

  ngOnInit(): void {
    const indexes: string[] = this.initialFilter().split('-');
    const firstIndex: number = parseInt(indexes[0]);
    const secondIndex: number = parseInt(indexes[1]);

    const firstFilter: TreeNode<string> = this.possibleFilters()[firstIndex];
    console.log(firstFilter)
    this.selectedNode = firstFilter.children ? firstFilter.children[secondIndex] : null;
    
    this.iconSelection();
  }

  handleNodeSelect(event: TreeNodeSelectEvent): void {
    const selectNode: TreeNode<string> = event.node;

    this.iconSelection();

    if (selectNode.data) {
      const indexes: string[] = selectNode.data.split('.');
  
      if (indexes.length > 0) {
        this.onSelectedFilter.emit(indexes);
      }
      else {
        this.onSelectedFilter.emit([selectNode.data]);
      }
    }
  }

  toggleSortDirection(): void {
    let animationDuration: number = 200;
    this.changingDirection = true;

    setTimeout(() => {
      this.changingDirection = false;
    }, animationDuration);

    setTimeout(() => {
      this.ascendingSort = !this.ascendingSort;
      this.iconSelection();
      this.onSortDirectionChange.emit(this.ascendingSort);
    }, animationDuration / 2.0);
  }
}
