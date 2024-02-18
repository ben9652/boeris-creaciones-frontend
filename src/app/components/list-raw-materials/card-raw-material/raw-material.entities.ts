export class RawMaterialUse {
    private fecha_uso: Date | null;
    private subelemento?: string;
    private cantidad: number;
    private nombre: string | null;
    private apellido: string | null;

    constructor();

    /**
     * Constructor para usos sobre materias primas NO CONTABLES
     */
    constructor(
        fecha_uso: Date,
        subelemento: string,
        cantidad: number,
        nombre: string,
        apellido: string
    );

    /**
     * Constructor para usos sobre materias primas CONTABLES
     */
    constructor(
        fecha_uso: Date,
        cantidad: number,
        nombre: string,
        apellido: string
    );

    constructor(...args: any[]) {
        if(args.length === 0) {
            this.fecha_uso = null;
            this.cantidad = 0;
            this.nombre = null;
            this.apellido = null;
        }
        else if(args.length === 4) {
            this.fecha_uso = args[0];
            this.cantidad = args[1];
            this.nombre = args[2];
            this.apellido = args[3];
        }
        else {
            this.fecha_uso = args[0];
            this.subelemento = args[1];
            this.cantidad = args[2];
            this.nombre = args[3];
            this.apellido = args[4];
        }
    }

    public get UseDate(): Date | null {
        return this.fecha_uso;
    }

    public get Subelement(): string | undefined {
        return this.subelemento;
    }

    public get Quantity(): number {
        return this.cantidad;
    }

    public get FullName(): string {
        return this.apellido + ', ' + this.nombre;
    }
}

export class RawMaterial {
    private readonly error_string_estado: string = 'El estado debe ser de 1 solo caracter.';
    
    private id_materiaPrima: number;
    private id_compra: number;
    private estado: string | null;
    private nombre: string | null;
    private precio: number;
    private proveedor: string | null;
    private fecha_orden: Date;
    private fecha_stockeo?: Date;
    private fecha_finalizacion_uso?: Date;
    
    // Solo presente en materias primas no contables
    private medida?: number;
    private unidad_medida?: string;
    
    // Solo presente en materias primas contables
    private cantidad_restante?: number;
    private cantidad_por_paquete?: number;

    private comentario?: string;
    private usos: RawMaterialUse[] = [];
    
    constructor();
    
    /*** Constructores para las materias primas CONTABLES ***/
    
    /**
     * Materia prima contable NUEVA
     */
    constructor(
        id_materiaPrima: number,
        id_compra: number,
        nombre: string | null,
        precio: number,
        proveedor: string | null,
        fecha_orden: Date,
        cantidad_por_paquete: number,
        comentario: string | undefined
    );

    /**
     * Materia prima contable EN STOCK
     */
    constructor(
        id_materiaPrima: number,
        id_compra: number,
        nombre: string | null,
        precio: number,
        proveedor: string | null,
        fecha_orden: Date,
        fecha_stockeo: Date,
        cantidad_por_paquete: number,
        cantidad_restante: number
    );
    
    /**
     * Materia prima contable UTILIZADA
     */
    constructor(
        id_materiaPrima: number,
        id_compra: number,
        nombre: string | null,
        precio: number,
        proveedor: string | null,
        fecha_orden: Date,
        fecha_stockeo: Date,
        fecha_finalizacion_uso: Date,
        cantidad_por_paquete: number,
        cantidad_restante: number
    );

    ////////////////////////////////////////////////////////
    
    /*** Constructores para las materias primas NO CONTABLES ***/

    /**
     * Materia prima NO contable NUEVA
     */
    constructor(
        id_materiaPrima: number,
        id_compra: number,
        nombre: string | null,
        precio: number,
        medida: number,
        unidad_medida: string,
        proveedor: string | null,
        fecha_orden: Date,
        comentario: string | undefined
    );

    /**
     * Materia prima NO contable EN STOCK
     */
    constructor(
        id_materiaPrima: number,
        id_compra: number,
        nombre: string | null,
        precio: number,
        medida: number,
        unidad_medida: string,
        proveedor: string | null,
        fecha_orden: Date,
        fecha_stockeo: Date
    );
    
    /**
     * Materia prima NO contable UTILIZADA
     */
    constructor(
        id_materiaPrima: number,
        id_compra: number,
        nombre: string | null,
        precio: number,
        medida: number,
        unidad_medida: string,
        proveedor: string | null,
        fecha_orden: Date,
        fecha_stockeo: Date,
        fecha_finalizacion_uso: Date
    );

    ////////////////////////////////////////////////////////////

    constructor(...args: any[]) {
        if(args.length === 0) {
            this.id_materiaPrima = 0;
            this.id_compra = 0;
            this.estado = null;
            this.nombre = null;
            this.precio = 0;
            this.proveedor = null;
            this.fecha_orden = new Date();
        }
        else {
            this.id_materiaPrima =          args[0];
            this.id_compra =                args[1];
            this.nombre =                   args[2];
            this.precio =                   args[3];

            const esContable: boolean = typeof args[5] !== "string";
            
            if(esContable) {
                const esNueva: boolean = typeof args[6] === "number";
                const estaEnStock: boolean = typeof args[7] === "number";

                if(esNueva) {
                    this.estado = 'P';
                    this.proveedor =                args[4];
                    this.fecha_orden =              args[5];
                    this.cantidad_por_paquete =     args[6];
                    this.cantidad_restante =        args[6];
                    this.comentario =               args[7];
                }
                else if(estaEnStock) {
                    this.estado = 'A';
                    this.proveedor =                args[4];
                    this.fecha_orden =              args[5];
                    this.fecha_stockeo =            args[6];
                    this.cantidad_por_paquete =     args[7];
                    this.cantidad_restante =        args[8];
                }
                else {
                    this.estado = 'U';
                    this.proveedor =                args[4];
                    this.fecha_orden =              args[5];
                    this.fecha_stockeo =            args[6];
                    this.fecha_finalizacion_uso =   args[7];
                    this.cantidad_por_paquete =     args[8];
                    this.cantidad_restante =        args[9];
                }
            }
            else {
                const esNueva: boolean = typeof args[8] === "string";
                const estaEnStock: boolean = args[9] === undefined;

                if(esNueva) {
                    this.estado = 'P';
                    this.medida =                   args[4];
                    this.unidad_medida =            args[5];
                    this.proveedor =                args[6];
                    this.fecha_orden =              args[7];
                    this.comentario =               args[8];
                }
                else if(estaEnStock) {
                    this.estado = 'A';
                    this.medida =                   args[4];
                    this.unidad_medida =            args[5];
                    this.proveedor =                args[6];
                    this.fecha_orden =              args[7];
                    this.fecha_stockeo =            args[8];
                }
                else {
                    this.estado = 'U';
                    this.medida =                   args[4];
                    this.unidad_medida =            args[5];
                    this.proveedor =                args[6];
                    this.fecha_orden =              args[7];
                    this.fecha_stockeo =            args[8];
                    this.fecha_finalizacion_uso =   args[9];
                }
            }
        }
    }

    public get ID_MP(): number {
        return this.id_materiaPrima;
    }

    public get ID_Compra(): number {
        return this.id_compra;
    }

    public get State(): string | null {
        return this.estado;
    }

    public set State(state: string) {
        if(state.length != 1) {
            throw new Error(this.error_string_estado);
        }
        
        this.estado = state;
    }

    public get Name(): string | null {
        return this.nombre;
    }

    public get Price(): number {
        return this.precio;
    }

    public get Measure(): number | undefined {
        return this.medida;
    }

    public get MeasureUnit(): string | undefined {
        return this.unidad_medida;
    }

    public get Provider(): string | null {
        return this.proveedor;
    }

    public get OrderDate(): Date {
        return this.fecha_orden;
    }

    public get StockDate(): Date | undefined {
        return this.fecha_stockeo;
    }

    public get TerminateDate(): Date | undefined {
        return this.fecha_finalizacion_uso;
    }

    public get QntyPerPack(): number | undefined {
        return this.cantidad_por_paquete;
    }

    public get CurrentQnty(): number | undefined {
        return this.cantidad_restante;
    }

    public set CurrentQnty(cantidad_restante: number) {
        this.cantidad_restante = cantidad_restante;
    }

    public get Comment(): string | undefined {
        return this.comentario;
    }

    public get Uses(): RawMaterialUse[] {
        return this.usos;
    }

    public PushUse(uso: RawMaterialUse): void {
        this.usos.push(uso);
    }

    public PopUse(): void {
        this.usos.pop();
    }

    public EsContable(): boolean {
        return this.unidad_medida === undefined;
    }

    public EsNoContable(): boolean {
        return this.cantidad_restante === undefined;
    }
}