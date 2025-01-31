import { Provider } from "./provider.entities";

export class NewPurchaseStepOne {
    private _description: string;
    private _provider: Provider;
    
    constructor(description: string, provider: Provider) {
        this._description = description;
        this._provider = provider;
    }

    public get description(): string {
        return this._description;
    }
    public get provider(): Provider {
        return this._provider;
    }
}

export class NewPurchaseStepThree {
    private _currency: string;
    private _paymentMethod: 'T' | 'E';
    private _receptionMode: 'B' | 'E';

    constructor(currency: string, paymentMethod: 'T' | 'E', receptionMode: 'B' | 'E') {
        this._currency = currency;
        this._paymentMethod = paymentMethod;
        this._receptionMode = receptionMode;
    }
    
    public get currency(): string {
        return this._currency;
    }
    public get paymentMethod(): 'T' | 'E' {
        return this._paymentMethod;
    }
    public get receptionMode(): 'B' | 'E' {
        return this._receptionMode;
    }
}