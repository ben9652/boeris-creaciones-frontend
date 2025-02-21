export class DiscardObject {
    private _reason: string;
    private _quantity: number;

    constructor(reason: string, quantity: number){
        this._reason = reason;
        this._quantity = quantity;
    }

    
    public get reason() : string {
        return this._reason
    }
    
    public set reason(value : string) {
        this._reason = value;
    }
    
    public get quantity() : number {
        return this._quantity
    }
    
    public set quantity(value : number) {
        this._quantity = value;
    }
    
}