export class RawMaterial {

    constructor(public id: number,
        public nombre: string | null,
        public imagen: string | null,
        public rubro: string | null,      //implementar una clase rubro?
        public unidad: string | null,     //implementar una clase rubro?
        public comentario: string | null,
        public stock: number){

        }
}