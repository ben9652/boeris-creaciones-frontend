export class RawMaterial {
    id_paquete: number;
    estado: string | null;
    nombre: string | null;
    precio: number;
    unidad_medida: string | null;
    proveedor: string | null;
    fecha_orden: Date;
    fecha_stock?: Date;
    fecha_descarte?: Date;
    cantidad_por_paquete: number;
    cantidad_actual: number;
    comentario: string | null;

    razon_aplicacion?: string;
    razon_desecho?: string;

    constructor();

    constructor(
        id_paquete: number,
        estado: string | null,
        nombre: string | null,
        precio: number,
        unidad_medida: string | null,
        proveedor: string | null,
        fecha_orden: Date,
        fecha_stock: Date,
        fecha_descarte: Date,
        cantidad_por_paquete: number,
        cantidad_actual: number,
        comentario: string | null,
        razon_aplicacion?: string,
        razon_desecho?: string
    );

    // constructor(
    //     id_paquete: number,
    //     estado: string | null,
    //     nombre: string | null,
    //     precio: number,
    //     unidad_medida: string | null,
    //     proveedor: string | null,
    //     fecha_orden: Date,
    //     fecha_stock: Date,
    //     fecha_descarte: Date,
    //     cantidad_por_paquete: number,
    //     cantidad_actual: number,
    //     comentario: string | null,
    // );

    constructor(...args: any[]) {
        if(args.length === 0) {
            this.id_paquete = 0;
            this.estado = null;
            this.nombre = null;
            this.precio = 0;
            this.unidad_medida = null;
            this.proveedor = null;
            this.fecha_orden = new Date();
            this.cantidad_por_paquete = 0;
            this.cantidad_actual = 0;
            this.comentario = null;
        }
        else if(args.length === 12) {
            // const day_fecha_orden: Date = args[6].getDate() + 1;
            // const day_fecha_stock: Date = args[7].getDate() + 1;
            // const day_fecha_descarte: Date = args[8].getDate() + 1;

            // args[6].setDate(day_fecha_orden);
            // args[7].setDate(day_fecha_stock);
            // args[8].setDate(day_fecha_descarte);
            
            this.id_paquete = args[0];
            this.estado = args[1];
            this.nombre = args[2];
            this.precio = args[3];
            this.unidad_medida = args[4];
            this.proveedor = args[5];
            this.fecha_orden = args[6];
            this.fecha_stock = args[7];
            this.fecha_descarte = args[8];
            this.cantidad_por_paquete = args[9];
            this.cantidad_actual = args[10];
            this.comentario = args[11];
        }
        else {
            this.id_paquete = args[0];
            this.estado = args[1];
            this.nombre = args[2];
            this.precio = args[3];
            this.unidad_medida = args[4];
            this.proveedor = args[5];
            this.fecha_orden = args[6];
            this.fecha_stock = args[7];
            this.fecha_descarte = args[8];
            this.cantidad_por_paquete = args[9];
            this.cantidad_actual = args[10];
            this.comentario = args[11];
            this.razon_aplicacion = args[12];
            this.razon_desecho = args[13];
        }
    }
}