export class DiscardObject {
    private reason: string;
    private quantity: number;

    constructor(reason: string, quantity: number){
        this.reason = reason;
        this.quantity = quantity;
    }

    
    public getReason() : string {
        return this.reason;
    }

    public getQuantity() : number {
        return this.quantity;
    }
    
}