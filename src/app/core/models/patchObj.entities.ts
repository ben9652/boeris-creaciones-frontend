export class PatchObject {
    // Operación a realizar con el dato
    op: string;

    // Atributo con el que operar
    path: string;

    // Valor asociado a la operación a realizar
    value: string;

    constructor(
        op: string,
        path: string,
        value: string
    ) {
        this.op = op;
        this.path = path;
        this.value = value;
    }
}