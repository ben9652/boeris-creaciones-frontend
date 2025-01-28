import { Provider } from "@angular/core";

export class NewPurchaseStepOne {
    private _description: string;
    private _provider: Provider;
    
    constructor(description: string, provider: Provider) {
        this._description = description;
        this._provider = provider;
    }
    
    public get provider(): Provider {
        return this._provider;
    }
    public set provider(value: Provider) {
        this._provider = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
}