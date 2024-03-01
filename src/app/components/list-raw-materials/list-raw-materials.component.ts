import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RawMaterial } from './card-raw-material/raw-material.entities';
import { SearchFilter, TreeSelectObject } from 'src/app/models/primeng.entities';
import { FilterOptions } from './list-raw-materials.entities';

export class FiltroTipoMateriaPrima {
  public _pedidas: boolean;
  public _en_stock: boolean;
  public _utilizadas: boolean;

  constructor(pedidas: boolean, en_stock: boolean, utilizadas: boolean) {
    this._pedidas = pedidas;
    this._en_stock = en_stock;
    this._utilizadas = utilizadas;
  }
}

enum FiltroBusqueda {
  ID = "ID de materia prima",
  NAME = "Nombre del producto",
  CURRENT_QNTY = "Cantidad restante",
  PROVIDER = "Proveedor"
}

enum AtributoOrden {
  PRODUCT = "Name",
  PROVIDER = "Provider",
  ORDER_DATE = "OrderDate",
  STOCK_DATE = "StockDate",
  TERMINATE_DATE = "TerminateDate",
  PRICE = "Price",
  CURRENT_QNTY = "CurrentQnty",
  QNTY_PER_PACK = "QntyPerPack"
}

@Component({
  selector: 'app-list-raw-materials',
  templateUrl: './list-raw-materials.component.html',
  styleUrls: ['./list-raw-materials.component.scss']
})
export class ListRawMaterialsComponent implements OnInit {
  @ViewChild('inputText') inputText!: ElementRef;

  /**
   * Lista de materias primas 
   */
  rawMaterials: RawMaterial[] = [];
  
  /**
   * Para mostrar las materias primas listadas. Esta será variable ya que pueden ser: filtradas por estado o re-ordenadas.
   */
  showedRawMaterials: RawMaterial[] = [];
  
  /**
   * Para mostrar las materias primas filtradas según el campo de búsqueda.
   */
  searchedRawMaterials: RawMaterial[] = [];

  /**
   * Para el despliegue del contenedor de búsqueda avanzada
   */
  busquedaAvanzadaActiva: boolean = false;
  
  /**
   * Para seleccionar entre los filtros de materias primas
   */
  filtrosSeleccionados: FilterOptions[] = [];

  filterOptions: FilterOptions[];
  
  /**
   * El texto en el InputText de la lupita
   */
  cadenaBusqueda: string = '';
  
  /**
   * Son las opciones que representan por qué atributo se buscará en el InputText
   */
  searchFilterOptions: SearchFilter[];

  /**
   * Es el criterio seleccionado para la búsqueda
   */
  searchFilterSelected: SearchFilter;
  
  /**
   * El orden seleccionado para la muestra de materias primas. Es directamente el nodo tipo TreeSelectObject.
   */
  ordenSeleccionado: TreeSelectObject | null;

  /**
   * El orden seleccionado, pero es directamente el nombre del atributo de la materia prima (del objeto RawMaterial)
   */
  criterioOrden: keyof RawMaterial;

  /**
   * Las opciones para los distintos tipos de ordenamiento
   */
  ordenOpciones: TreeSelectObject[];

  /**
   * Estado del boton al lado del combo de ordenamiento
   */
  ordenAscendente: boolean = false;

  /**
   * Para las animaciones
   */
  cambioOrden: boolean = false;

  /**
   * Para capturar el evento de cuando se aprieta sobre una etiqueta de uno de los filtros.
   * Esto es porque cuando se hace click sobre una de las etiquetas, filtrarMateriasPrimas() se ejecuta dos veces
   * al propagarse el evento directo para el INPUT del RadioButton.
   */
  labelCapturada: boolean = false;

  ngOnInit(): void {

  }
  
  constructor() {
    this.searchFilterOptions = [
      new SearchFilter('ID de materia prima'),
      new SearchFilter('Nombre del producto'),
      new SearchFilter('Cantidad restante'),
      new SearchFilter('Proveedor'),
    ]

    this.filterOptions = [
      new FilterOptions('Pedidas', 'P', 'pedidas'),
      new FilterOptions('En stock', 'A', 'en-stock'),
      new FilterOptions('Utilizadas', 'U', 'utilizadas')
    ];
    this.filtrosSeleccionados.push(this.filterOptions[1])

    // Armo el árbol que corresponde para el TreeSelect para el ordenamiento
    this.ordenOpciones = this.buildTreeSelect();
    // Asigno como criterio de orden la fecha de stockeo
    this.ordenSeleccionado = TreeSelectObject.getNodeFromArray(this.ordenOpciones, "1-1");
    this.criterioOrden = AtributoOrden.STOCK_DATE;

    // Hago que el atributo de búsqueda predeterminado sea el ID
    this.searchFilterSelected = this.searchFilterOptions[0];

    this.rawMaterials.push(
      new RawMaterial(
        5478761,
        30,
        'Palillos de madera',
        5120,
        'Un gran proveedor de madera refinada',
        new Date('2021-07-26'),
        12,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reiciendis dolores! Saepe dicta voluptatibus molestiae placeat delectus quaerat similique quas et. Debitis est et, sed dolore magni necessitatibus deserunt corporis?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat dignissimos beatae aliquid dicta sint mollitia cum tenetur nobis quidem provident odio eaque veritatis ea, inventore porro laudantium, ab nesciunt facilis.'
      ),
      new RawMaterial(
        5339875,
        30,
        'Palillos de madera',
        5120,
        'Un gran proveedor de madera refinada',
        new Date('2021-07-26'),
        new Date('2021-07-28'),
        12,
        2
      ),
      new RawMaterial(
        4868811,
        30,
        'Palillos de madera',
        5120,
        'Un gran proveedor de madera refinada',
        new Date('2021-07-26'),
        new Date('2021-07-28'),
        new Date('2021-08-21'),
        12,
        2
      ),
      new RawMaterial(
        1452098,
        87,
        'Tela blanca',
        8009,
        2,
        'm2',
        'El telar',
        new Date('2022-05-12'),
        'Se debe recoger por la tarde'
      ),
      new RawMaterial(
        4378829,
        90,
        'Tela blanca',
        8009,
        2,
        'm2',
        'El telar',
        new Date('2022-05-12'),
        new Date('2022-05-23')
      ),
      new RawMaterial(
        7613755,
        100,
        'Tela blanca',
        8009,
        2,
        'm2',
        'El telar',
        new Date('2022-05-12'),
        new Date('2022-05-23'),
        new Date('2022-09-02')
      ),
      new RawMaterial(
        8374812,
        103,
        'Tela azul',
        7000,
        3,
        'm2',
        'El telar',
        new Date('2022-06-05'),
        'Orden de compra pendiente'
      ),
      new RawMaterial(
        1867828,
        105,
        'Cuero sintético',
        6500,
        5,
        'm2',
        'Fábrica de textiles',
        new Date('2022-06-10'),
        new Date('2022-06-15')
      ),
      new RawMaterial(
        4891743,
        110,
        'Hilo de algodón',
        300,
        1000,
        'metros',
        'Hilandería S.A.',
        new Date('2022-06-20'),
        new Date('2022-06-25'),
        new Date('2022-08-15')
      ),
      new RawMaterial(
        3938915,
        93,
        'Cajas de cartón',
        2500,
        'Paquete de 50 unidades',
        new Date('2022-06-20'),
        new Date('2022-06-22'),
        new Date('2022-06-30'),
        50,
        12
      ),
      new RawMaterial(
        2722017,
        95,
        'Cajas de cartón',
        2500,
        'Paquete de 50 unidades',
        new Date('2022-06-20'),
        new Date('2022-06-22'),
        new Date('2022-06-30'),
        50,
        5
      ),
      new RawMaterial(
        8064685,
        105,
        'Papel de embalaje',
        1500,
        'Paquete de 100 hojas',
        new Date('2022-06-25'),
        new Date('2022-06-27'),
        new Date('2022-07-05'),
        100,
        25
      ),
      new RawMaterial(
        5016830,
        110,
        'Papel de embalaje',
        1500,
        'Paquete de 100 hojas',
        new Date('2022-06-25'),
        new Date('2022-06-27'),
        new Date('2022-07-05'),
        100,
        15
      ),
      new RawMaterial(
        3579885,
        80,
        'Aceite de cocina',
        40,
        5,
        'litros',
        'Distribuidora de alimentos',
        new Date('2023-08-15'),
        'Producto de alta calidad'
      ),
      new RawMaterial(
        4239928,
        85,
        'Aceite de cocina',
        40,
        5,
        'litros',
        'Distribuidora de alimentos',
        new Date('2023-08-15'),
        'Producto de alta calidad'
      ),
      new RawMaterial(
        2364081,
        95,
        'Harina de trigo',
        30,
        25,
        'kilogramos',
        'Molino San Pablo',
        new Date('2023-08-20'),
        'Materia prima para panadería'
      ),
      new RawMaterial(
        4282411,
        100,
        'Harina de trigo',
        30,
        25,
        'kilogramos',
        'Molino San Pablo',
        new Date('2023-08-20'),
        'Materia prima para panadería'
      ),
    );

    this.showedRawMaterials = this.rawMaterials;
    this.filtrarMateriasPrimas(null);
  }

  // Para que aparezca el cursor en el Input Text de la búsqueda aún cuando se apriete sobre la lupa
  private focusInput() {
    this.inputText.nativeElement.focus();
  }
  onSearchClick() {
    this.focusInput();
  }

  buildTreeSelect(): TreeSelectObject[] {
    const opcionesAlfabeticas: TreeSelectObject[] = TreeSelectObject.armarNivel(
      new TreeSelectObject('Producto', 'fas fa-box'),
      new TreeSelectObject('Proveedor', 'fas fa-user-tie')
    )

    const opcionesDeFechas: TreeSelectObject[] = TreeSelectObject.armarNivel(
      new TreeSelectObject('De orden', 'fas fa-calendar-check'),
      new TreeSelectObject('De stockeo', 'fas fa-calendar-plus'),
      new TreeSelectObject('De utilización', 'fas fa-calendar-minus')
    )

    const opcionesDeMagnitud: TreeSelectObject[] = TreeSelectObject.armarNivel(
      new TreeSelectObject('Precio', 'fas fa-dollar'),
      new TreeSelectObject('Cantidad restante', 'fas fa-box-open'),
      new TreeSelectObject('Cantidad por paquete', 'fas fa-boxes-stacked')
    )

    const padresOpciones: TreeSelectObject[] = TreeSelectObject.armarNivel(
      new TreeSelectObject('Alfabéticamente', 'fas fa-font', false),
      new TreeSelectObject('Fecha', 'fas fa-calendar', false),
      new TreeSelectObject('Magnitud', 'fas fa-weight-hanging', false)
    )
    
    TreeSelectObject.asignarPadre(
      padresOpciones[0],
      opcionesAlfabeticas
    );

    TreeSelectObject.asignarPadre(
      padresOpciones[1],
      opcionesDeFechas
    );

    TreeSelectObject.asignarPadre(
      padresOpciones[2],
      opcionesDeMagnitud
    );

    return padresOpciones;
  }

  esOrdenAlfabetico(): boolean {
    const keyParts: string[] | undefined = this.ordenSeleccionado?.key?.split('-');
    
    return keyParts ? keyParts[0] === '0' : false;
  }
  esOrdenadoPorFecha(): boolean {
    const keyParts: string[] | undefined = this.ordenSeleccionado?.key?.split('-');
    
    return keyParts ? keyParts[0] === '1' : false;
  }
  esOrdenadoPorMagnitud(): boolean {
    const keyParts: string[] | undefined = this.ordenSeleccionado?.key?.split('-');
    
    return keyParts ? keyParts[0] === '2' : false;
  }

  // Para las animaciones y banderas de los iconos de ordenamiento ascendente o descendente
  cambiarOrden() {
    let duracionAnimacion: number;
    this.cambioOrden = true;

    if(this.esOrdenadoPorFecha()) {
      duracionAnimacion = 200;
    }
    else {
      duracionAnimacion = 500;
    }

    setTimeout(() => {
      this.cambioOrden = false;
    }, duracionAnimacion);

    setTimeout(() => {
      this.ordenAscendente = !this.ordenAscendente;
      let keyParts: string[] | undefined = this.ordenSeleccionado?.key?.split('-');

      if(keyParts) {
        switch(keyParts[0]) {
          case '0':
            this.ordenarAlfabeticamente();
            break;
          case '1':
            this.ordenarPorFecha();
            break;
          case '2':
            this.ordenarPorMagnitud();
            break;
        }
      }
    }, duracionAnimacion / 2.0);
  }

  filtrarMateriasPrimas(event: any) {
    // Obtener el elemento de destino del evento de clic
    // Para que no se propague el evento de click al input si se aprieta sobre la etiqueta
    if(event !== null) {
      const targetElement = event.target as HTMLElement;

      // Capturar el click si se lo hace sobre la etiqueta
      if(targetElement.tagName === 'LABEL' && this.labelCapturada === false) {
        this.labelCapturada = true;
        return;
      }

      /**
       * Aquí se entra dos veces:
       *  1) Cuando se hace click directamente sobre el Radio Button
       *  2) Cuando se propaga el click sobre el Radio Button luego de hacer click sobre la etiqueta
       */
      if (targetElement.tagName === 'INPUT') {
        this.labelCapturada = false;
      }
    }

    this.showedRawMaterials = this.rawMaterials.filter(material =>
      this.filtrosSeleccionados.length === 0 || this.filtrosSeleccionados.some(filtro => material.State === filtro.key)
    );

    this.ordenarMateriasPrimas();

    this.buscar();
  }

  ordenarMateriasPrimas() {
    let keyParts: string[] | undefined = this.ordenSeleccionado?.key?.split('-');
    if(keyParts) {
      switch(keyParts[0]) {
        // Si es alfabéticamente
        case '0':
          if(keyParts[1] === '0') {
            this.criterioOrden = AtributoOrden.PRODUCT;
          }
          else {
            this.criterioOrden = AtributoOrden.PROVIDER;
          }

          this.ordenarAlfabeticamente();

          break;
        
        // Si es por fecha
        case '1':
          if(keyParts[1] === '0') {
            this.criterioOrden = AtributoOrden.ORDER_DATE;
          }
          else if(keyParts[1] === '1') {
            this.criterioOrden = AtributoOrden.STOCK_DATE;
          }
          else {
            this.criterioOrden = AtributoOrden.TERMINATE_DATE;
          }

          this.ordenarPorFecha();

          break;

        // Si es por magnitud
        case '2':
          if(keyParts[1] === '0') {
            this.criterioOrden = AtributoOrden.PRICE;
          }
          else if(keyParts[1] === '1') {
            this.criterioOrden = AtributoOrden.CURRENT_QNTY;
          }
          else {
            this.criterioOrden = AtributoOrden.QNTY_PER_PACK;
          }

          this.ordenarPorMagnitud();
          
          break;
      }
    }

    this.buscar();
  }

  private ordenarAlfabeticamente() {
    const atr: keyof RawMaterial = this.criterioOrden;
    this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
      const stringA: any = a[atr]?.toString().toLowerCase();
      const stringB: any = b[atr]?.toString().toLowerCase();
      
      if(stringA < stringB) {
        return this.ordenAscendente ? -1 : 1;
      }

      if(stringA > stringB) {
        return this.ordenAscendente ? 1 : -1;
      }

      return 0;
    });
  }

  private ordenarPorFecha() {
    // Primero mando a las materias primas cuyos estados no corresponden con su fecha, al último
    switch(this.criterioOrden) {
      case AtributoOrden.ORDER_DATE:
        this.showedRawMaterials = this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if (a.State === 'P' && b.State !== 'P')
              return -1; // 'P' viene antes que cualquier otro caracter
          else if (a.State === 'A' && b.State === 'U')
              return -1; // 'A' viene antes que 'U'
          else if (a.State === 'A' && b.State === 'P')
              return 1; // 'P' viene antes que 'A'
          else if (a.State === 'U' && b.State !== 'U')
              return 1; // 'U' viene después que cualquier otro caracter
          else
              return 0; // Igual orden para los demás casos
        });
        break;
      case AtributoOrden.STOCK_DATE:
        this.showedRawMaterials = this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if (a.State === 'A' && b.State !== 'A')
              return -1; // 'P' viene antes que cualquier otro caracter
          else if (a.State === 'U' && b.State === 'P')
              return -1; // 'A' viene antes que 'U'
          else if (a.State === 'U' && b.State === 'A')
              return 1; // 'P' viene antes que 'A'
          else if (a.State === 'P' && b.State !== 'P')
              return 1; // 'U' viene después que cualquier otro caracter
          else
              return 0; // Igual orden para los demás casos
        });
        break;
      case AtributoOrden.TERMINATE_DATE:
        this.showedRawMaterials = this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if (a.State === 'U' && b.State !== 'U')
              return -1; // 'P' viene antes que cualquier otro caracter
          else if (a.State === 'A' && b.State === 'P')
              return -1; // 'A' viene antes que 'U'
          else if (a.State === 'A' && b.State === 'U')
              return 1; // 'P' viene antes que 'A'
          else if (a.State === 'P' && b.State !== 'P')
              return 1; // 'U' viene después que cualquier otro caracter
          else
              return 0; // Igual orden para los demás casos
        });
        break;
      default:
        break;
    }

    const pedidas = this.showedRawMaterials.filter(material => material.State === 'P');
    const en_stock = this.showedRawMaterials.filter(material => material.State === 'A');
    const utilizadas = this.showedRawMaterials.filter(material => material.State === 'U');

    this.showedRawMaterials = [];

    // Finalmente ordeno aquellas materias primas del mismo estado que quedaron primeras según su fecha correspondiente
    switch(this.criterioOrden) {
      case AtributoOrden.ORDER_DATE:
        // Ordeno de mayor a menor a las materias primas pedidas, luego ordeno así a las materias primas stockeadas, y finalmente a las utilizadas
        this.showedRawMaterials = this.showedRawMaterials.concat(
          pedidas.sort((a: RawMaterial, b: RawMaterial) => 
            this.ordenAscendente ?
                a.OrderDate.getTime() - b.OrderDate.getTime() :
                b.OrderDate.getTime() - a.OrderDate.getTime()
          ),
          en_stock.sort((a: RawMaterial, b: RawMaterial) => 
            this.ordenAscendente ?
                a.OrderDate.getTime() - b.OrderDate.getTime() :
                b.OrderDate.getTime() - a.OrderDate.getTime()
          ),
          utilizadas.sort((a: RawMaterial, b: RawMaterial) => 
            this.ordenAscendente ?
                a.OrderDate.getTime() - b.OrderDate.getTime() :
                b.OrderDate.getTime() - a.OrderDate.getTime()
          )
        );
        break;
        // return this.ordenAscendente ?
        //         a.OrderDate.getTime() - b.OrderDate.getTime() :
        //         b.OrderDate.getTime() - a.OrderDate.getTime();

      case AtributoOrden.STOCK_DATE:
        // Ordeno de mayor a menor a las materias primas stockeadas, luego ordeno así a las materias primas utilizadas, y finalmente a las pedidas
        this.showedRawMaterials = this.showedRawMaterials.concat(
          en_stock.sort((a: RawMaterial, b: RawMaterial) => {
            if(a.StockDate === undefined || b.StockDate === undefined) {
              return 0;
            }
            return this.ordenAscendente ?
            a.StockDate.getTime() - b.StockDate.getTime() :
            b.StockDate.getTime() - a.StockDate.getTime();
          }),
          utilizadas.sort((a: RawMaterial, b: RawMaterial) => {
            if(a.StockDate === undefined || b.StockDate === undefined) {
              return 0;
            }
            return this.ordenAscendente ?
            a.StockDate.getTime() - b.StockDate.getTime() :
            b.StockDate.getTime() - a.StockDate.getTime();
          }),
          pedidas
        );
        break;
        // if(a.StockDate === undefined || b.StockDate === undefined) {
        //   return 0;
        // }
        // return this.ordenAscendente ?
        //         a.StockDate.getTime() - b.StockDate.getTime() :
        //         b.StockDate.getTime() - a.StockDate.getTime();

      case AtributoOrden.TERMINATE_DATE:
        // Ordeno de mayor a menor a las materias primas utilizadas, luego ordeno así a las materias primas stockeadas, y finalmente a las pedidas
        this.showedRawMaterials = this.showedRawMaterials.concat(
          utilizadas.sort((a: RawMaterial, b: RawMaterial) => {
            if(a.StockDate === undefined || b.StockDate === undefined) {
              return 0;
            }
            return this.ordenAscendente ?
            a.StockDate.getTime() - b.StockDate.getTime() :
            b.StockDate.getTime() - a.StockDate.getTime();
          }),
          en_stock,
          pedidas
        );
        // if(a.TerminateDate === undefined || b.TerminateDate === undefined) {
        //   return 0;
        // }
        // return this.ordenAscendente ?
        //         a.TerminateDate.getTime() - b.TerminateDate.getTime() :
        //         b.TerminateDate.getTime() - a.TerminateDate.getTime();
        break;        
    }
  }

  private ordenarPorMagnitud() {
    // Cuando se realiza el orden por cantidad restante, y por cantidad de ítems por paquete, a las materias primas no contables se las deja en el último lugar de la lista.
    switch(this.criterioOrden) {
      case AtributoOrden.PRICE:
        this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) =>
          this.ordenAscendente ?
            a.Price - b.Price :
            b.Price - a.Price
        );
        break;

      case AtributoOrden.CURRENT_QNTY:
        // Dejo las materias primas no contables al último
        this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if(a.EsNoContable() && b.EsContable()) return 1;        // a va después de b
          else if(a.EsContable() && b.EsNoContable()) return -1;  // a va antes de b
          else return 0;                                          // a y b permanecen en el mismo orden
        })
        
        this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          // Si a.estado es 'P' o 'U', lo movemos al final del arreglo
          if (a.State === 'P' || a.State === 'U') return 1;
          // Si b.estado es 'P' o 'U', lo mantenemos en su posición actual
          if (b.State === 'P' || b.State === 'U') return -1;
          // Si ninguno de los estados es 'P' o 'U', mantenemos el orden actual
          return 0;
        })
        
        this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if(a.CurrentQnty === undefined || b.CurrentQnty === undefined) return 0;
          else if(a.CurrentQnty !== undefined || b.CurrentQnty === undefined) return -1;
          else if(a.CurrentQnty === undefined || b.CurrentQnty !== undefined) return 1;
          
          return this.ordenAscendente ?
            a.CurrentQnty - b.CurrentQnty :
            b.CurrentQnty - a.CurrentQnty
        })
        break;

      case AtributoOrden.QNTY_PER_PACK:
        // Dejo las materias primas no contables al último
        this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if(a.EsNoContable() && b.EsContable()) return 1;        // a va después de b
          else if(a.EsContable() && b.EsNoContable()) return -1;  // a va antes de b
          else return 0;                                          // a y b permanecen en el mismo orden
        })
        
        this.showedRawMaterials.sort((a: RawMaterial, b: RawMaterial) => {
          if(a.QntyPerPack === undefined || b.QntyPerPack === undefined) return 0;
          else if(a.QntyPerPack !== undefined || b.QntyPerPack === undefined) return -1;
          else if(a.QntyPerPack === undefined || b.QntyPerPack !== undefined) return 1;
          
          return this.ordenAscendente ?
            a.QntyPerPack - b.QntyPerPack :
            b.QntyPerPack - a.QntyPerPack
        })
        break;
    }
  }

  buscar() {
    let filter_condition: boolean | undefined;
    this.searchedRawMaterials = this.showedRawMaterials.filter((material: RawMaterial) => {
      switch(this.searchFilterSelected.filtro) {
        case FiltroBusqueda.ID:
          const ID_string: string = material.ID_MP.toString();
          filter_condition = ID_string.includes(this.cadenaBusqueda);
          return ID_string.includes(this.cadenaBusqueda);
        case FiltroBusqueda.NAME:
          const name: string | null = material.Name;
          filter_condition = name?.includes(this.cadenaBusqueda);
          return filter_condition;
        case FiltroBusqueda.CURRENT_QNTY:
          const currentQnty: number | undefined = material.CurrentQnty;
          filter_condition = currentQnty?.toString().includes(this.cadenaBusqueda);
          return filter_condition;
        case FiltroBusqueda.PROVIDER:
          const provider: string | null = material.Provider;
          filter_condition = provider?.toString().includes(this.cadenaBusqueda);
          return filter_condition;
        default:
          return 0;
      }
    })
  }
}
