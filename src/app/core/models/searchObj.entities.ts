export class SearchObject {
    private key: string;
    private name: string;

    constructor(key: string, name: string) {
        this.key = key;
        this.name = name;
    }

    public getKey(): string {
        return this.key;
    }

    public getName(): string {
        return this.name;
    }
}