export class SearchObject {
    private _key: string;
    private _name: string;

    constructor(key: string, name: string) {
        this._key = key;
        this._name = name;
    }

    public get key(): string {
        return this._key;
    }
    public set key(value: string) {
        this._key = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}