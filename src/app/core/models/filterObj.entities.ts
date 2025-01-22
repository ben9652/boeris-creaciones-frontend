export class FilterObject {
    private _key: string;
    private _name: string | null;
    private _color: string | null;

    constructor(key: string, name: string | null, color: string | null) {
        if (key.length > 1) {
            throw new Error('FilterObject: Key must be a single character');
        }
                
        this._key = key;
        this._name = name;
        this._color = color;
    }
    
    public get key(): string {
        return this._key;
    }

    public get name(): string | null {
        return this._name;
    }

    public get color(): string | null {
        return this._color;
    }
}

export class CheckboxValue {
    private _key: string;
    private _value: boolean;

    constructor(key: string, value: boolean) {
        if (key.length > 1) {
            throw new Error('CheckboxValue: Key must be a single character');
        }

        this._key = key;
        this._value = value;
    }

    public get key(): string {
        return this._key;
    }

    public get value(): boolean {
        return this._value;
    }
}