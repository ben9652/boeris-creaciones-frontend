export class PatchObject {
    op: string;
    path: string;
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