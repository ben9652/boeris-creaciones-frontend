import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RawMaterial } from './raw-material.entities';

@Component({
  selector: 'app-card-raw-material',
  templateUrl: './card-raw-material.component.html',
  styleUrls: ['./card-raw-material.component.scss']
})
export class CardRawMaterialComponent implements OnInit, AfterViewInit {
  @ViewChild('contenedorTexto') contTexto!: ElementRef;
  @ViewChild('tituloContenedorTexto') titContTexto!: ElementRef;
  @ViewChild('textoRazon') texto!: ElementRef;
  @ViewChild('opTextRazon') overlayPanels!: ElementRef;
  isTextOverflowed: boolean = false;
  
  @Input({required: true}) rawMaterial: RawMaterial = new RawMaterial();
  
  cantidad_a_restar: string = '';
  
  icono_estado: any = [];
  color_estado = {};
  background_color_estado = {};
  
  constructor(
    
  ) {
  }
    
  ngOnInit(): void {
    this.color_estado = {
      'color-estado-pendiente': this.rawMaterial.estado === 'P',
      'color-estado-activa': this.rawMaterial.estado === 'A',
      'color-estado-utilizada': this.rawMaterial.estado === 'U',
      'color-estado-desechada': this.rawMaterial.estado === 'D'
    };
    this.background_color_estado = {
      'p-card p-component background-color-estado-pendiente': this.rawMaterial.estado === 'P',
      'p-card p-component background-color-estado-activa': this.rawMaterial.estado === 'A',
      'p-card p-component background-color-estado-utilizada': this.rawMaterial.estado === 'U',
      'p-card p-component background-color-estado-desechada': this.rawMaterial.estado === 'D'
    };
    
    switch(this.rawMaterial.estado) {
    case 'P':
      this.icono_estado = ['fas', 'clock'];
      break;
    case 'A':
      this.icono_estado = ['fas', 'box-open'];
      break;
      case 'U':
        this.icono_estado = ['fas', 'circle-check'];
        break;
        case 'D':
          this.icono_estado = ['fas', 'ban'];
      break;
    }
  }
  
  // Uso esto para que no se 
  ngAfterViewInit(): void {
    setTimeout(() => {
      const vh1 = window.innerHeight * 0.01;
      const containerHeight = this.contTexto.nativeElement.clientHeight + vh1;
      const titleContHeight = this.titContTexto.nativeElement.clientHeight + vh1;
      const textHeight = this.texto.nativeElement.clientHeight;
  
      // Medición de la altura de un caracter
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      // Un solo caracter como ejemplo
      span.textContent = 'a';
      this.texto.nativeElement.appendChild(span);
  
      const charHeight = span.offsetHeight;
  
      this.texto.nativeElement.removeChild(span);
      ///////////////////////////////////////
  
      // console.log('Altura de un caracter: ', charHeight);
  
      const topPaddingP = 5;
  
      const textContHeight = containerHeight - titleContHeight - vh1 - topPaddingP;
      let linesThatFit = textContHeight / charHeight;
      // console.log('Nº de líneas sin truncar: ', linesThatFit)
      linesThatFit = Math.trunc(linesThatFit);
      
      // console.log('Alto del contenedor: ', containerHeight);
      // console.log('Alto del títutlo: ', titleContHeight);
      // console.log('Alto del contenedor del texto: ', textContHeight);
      // console.log('Alto del texto: ', textHeight);
      // console.log('¿Cuántas líneas entran?', linesThatFit);
      // console.log('Altura definitiva del texto: ', charHeight * linesThatFit);
      // console.log('Altura definitiva del contenedor: ', charHeight * linesThatFit + titleContHeight);
  
      const alturaDefinitivaTexto = (charHeight * linesThatFit) + vh1;
      const alturaDefinitivaTitulo = titleContHeight;
      const alturaDefinitivaContenedor = (alturaDefinitivaTexto + alturaDefinitivaTitulo).toString(10) + 'px';
  
      this.contTexto.nativeElement.style.height = alturaDefinitivaContenedor;
      this.texto.nativeElement.style.height = alturaDefinitivaTexto.toString(10) + 'px';

      const remainingContHeight = containerHeight - titleContHeight;
      if(textHeight > remainingContHeight)
        this.isTextOverflowed = true;
    }, 0);
  }

  usarMateriaPrima() {
    console.log(this.cantidad_a_restar);
  }

  descartarMateriaPrima() {
    console.log(this.cantidad_a_restar);
  }
}
