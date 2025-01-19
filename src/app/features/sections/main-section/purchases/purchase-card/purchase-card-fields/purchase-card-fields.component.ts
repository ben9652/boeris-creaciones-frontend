import { AfterViewInit, Component, ElementRef, input, InputSignal, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DeviceTypeService } from '../../../../../../core/services/device-type/device-type.service';
import { Purchase } from '../../../../../../core/models/purchase.entities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-purchase-card-fields',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    TooltipModule,
    DialogModule
  ],
  templateUrl: './purchase-card-fields.component.html',
  styleUrl: './purchase-card-fields.component.scss'
})
export class PurchaseCardFieldsComponent implements AfterViewInit {
  purchase: InputSignal<Purchase> = input.required<Purchase>();

  @ViewChild('fields') fieldsCont!: ElementRef;
  @ViewChild('idContainer') idCont!: ElementRef;
  @ViewChild('textDescriptionContainer') textCont!: ElementRef;
  @ViewChild('textContainerTitle') textTitleCont!: ElementRef;
  @ViewChild('description') text!: ElementRef;
  @ViewChild('opDescription') popoverDescription!: ElementRef;
  
  isTextOverflowed: boolean = false;

  displayDescription: boolean = false;
  
  constructor(
    public translateService: TranslateService,
    public deviceTypeService: DeviceTypeService
  ) {
    
  }

  ngAfterViewInit(): void {
      setTimeout(() => {
        const containerHeight = this.fieldsCont.nativeElement.clientHeight;
        const idContHeight = this.idCont.nativeElement.clientHeight;
        const titleContHeight = this.textTitleCont.nativeElement.clientHeight;
        const textHeight = this.text.nativeElement.clientHeight;

        // Medición de la altura de un caracter
        const span = document.createElement('span');
        span.style.visibility = 'hidden';

        // Un solo caracter como ejemplo
        span.textContent = 'a';
        this.text.nativeElement.appendChild(span);

        const charHeight = span.offsetHeight;

        this.text.nativeElement.removeChild(span);
        ///////////////////////////////////////

        const topPaddingP = 20;

        const textContHeight = containerHeight - titleContHeight - idContHeight;
        let linesThatFit = textContHeight / charHeight;
        
        linesThatFit = Math.trunc(linesThatFit);

        const finalTextHeight = charHeight * linesThatFit;
        const finalTitleHeight = titleContHeight;
        const finalTextContainerHeight = (finalTextHeight + finalTitleHeight).toString(10) + 'px';

        this.textCont.nativeElement.style.height = finalTextContainerHeight;
        this.text.nativeElement.style.height = finalTextHeight.toString(10) + 'px';
        
        if(textHeight > finalTextHeight)
          this.isTextOverflowed = true;
      }, 0)
  }
  
  showDescription($event: MouseEvent) {
    this.displayDescription = true;
  }
}
