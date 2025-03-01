import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, ModelSignal, model, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelect } from 'primeng/treeselect';
import { SortDirectionComponent } from './sort-direction/sort-direction.component';

@Component({
  selector: 'app-table-sorting',
  imports: [
    TreeSelect,
    FormsModule,
    CommonModule,
    SortDirectionComponent
  ],
  templateUrl: './table-sorting.component.html',
  styleUrl: './table-sorting.component.scss'
})
export class TableSortingComponent implements OnInit {
  // Si se quiere encapsular las entradas de este componente, ayudarse con la interfaz SortingTreeObject
  possibleFilters: InputSignal<TreeNode<string>[]> = input.required<TreeNode<string>[]>();
  initialFilter: InputSignal<string> = input<string>('0-0');

  ascendingSort: InputSignal<ModelSignal<boolean>> = input.required<ModelSignal<boolean>>();
  
  selectedNode: TreeNode<string> | null = null;

  // Aquí se guardará el icono de la dirección de la ordenación
  sortDirectionIcon: string = "";

  // Este es el tipo de nodo padre que se ha seleccionado
  parentType: string = '2';

  onSelectedFilter: OutputEmitterRef<string[]> = output<string[]>();
  onSortDirectionChange: OutputEmitterRef<void> = output<void>();
  
  constructor() {

  }

  private iconSelection(): void {
    if (this.selectedNode && this.selectedNode.parent) {
      // Si el nodo seleccionado tiene de tipo el número 1, signfica que es un nodo de ordenación alfabética
      // Si el nodo seleccionado tiene de tipo el número 2, signfica que es un nodo de ordenación por fecha
      // Si el nodo seleccionado tiene de tipo el número 3, signfica que es un nodo de ordenación por una magnitud numérica
      if (this.selectedNode.parent.type) {
          this.parentType = this.selectedNode.parent.type;
      }
    }
  }

  ngOnInit(): void {
    const indexes: string[] = this.initialFilter().split('-');
    const firstIndex: number = parseInt(indexes[0]);
    const secondIndex: number = parseInt(indexes[1]);

    const firstFilter: TreeNode<string> = this.possibleFilters()[firstIndex];
    
    this.selectedNode = firstFilter.children ? firstFilter.children[secondIndex] : null;
    
    this.iconSelection();
  }

  handleNodeSelect(event: TreeNodeSelectEvent): void {
    const selectNode: TreeNode<string> = event.node;

    this.iconSelection();

    if (selectNode.key) {
      const indexes: string[] = selectNode.key.split('-');
  
      if (indexes.length > 0) {
        this.onSelectedFilter.emit(indexes);
      }
      else {
        this.onSelectedFilter.emit([selectNode.key]);
      }
    }
  }

  toggleSortDirection(): void {
    this.onSortDirectionChange.emit();
  }
}
