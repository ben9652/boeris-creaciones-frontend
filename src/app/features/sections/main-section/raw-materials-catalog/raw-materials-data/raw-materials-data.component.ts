import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-raw-materials-data',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule
  ],
  templateUrl: './raw-materials-data.component.html',
  styleUrl: './raw-materials-data.component.scss'
})
export class RawMaterialsDataComponent {
  rubros: string[] = [
    "Rubro 1",
    "Rubro 2",
    "Rubro 3"
  ];
  unidad: string[] = [
    "centimetros",
    "litros",
    "newton?"
  ];
}
