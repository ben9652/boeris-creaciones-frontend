import { areCategoriesEqual, Category } from "./category.entities";
import { RowList } from "./rowList.entities";

export interface Provider {
    id: number,
    name: string | null,
    category: Category | null,
    residence: string | null,
    phone: number | null,
    cvu_or_alias: string | null
}

export interface ProviderRow extends RowList<Provider> {
    
}

export function createNullProvider(): Provider {
    let newProvider: Provider = {
        id: 0,
        name: null,
        category: null,
        residence: null,
        phone: null,
        cvu_or_alias: null
    };

    return newProvider;
}

export function isNullProvider(provider: Provider): boolean {
    const id: boolean = provider.id === 0;
    const name: boolean = provider.name === null;
    const category: boolean = provider.category === null;
    const residence: boolean = provider.residence === null;
    const phone: boolean = provider.phone === null;
    const cvu_or_alias: boolean = provider.cvu_or_alias === null;

    return id && name && category && residence && phone && cvu_or_alias;
}

export function areProvidersEqual(obj1: Provider | null, obj2: Provider | null): boolean {
    if(obj1 !== null && obj2 !== null) {
        if(obj1.id !== obj2.id)
            return false;
        if(obj1.name !== obj2.name)
            return false;
        if(!areCategoriesEqual(obj1.category, obj2.category))
            return false;
        if(obj1.residence !== obj2.residence)
            return false;
        if(obj1.phone !== obj2.phone)
            return false;
        if(obj1.cvu_or_alias !== obj2.cvu_or_alias)
            return false;
    }
    else if(obj1 === null || obj2 === null)
        return false;

    return true;
}

export function createProviderRow(nonModified: Provider, modified: Provider): ProviderRow {
    let providerRow: ProviderRow = {
        nonModified: createNullProvider(),
        modified: createNullProvider()
    };

    providerRow.nonModified = nonModified;
    providerRow.modified = modified;

    return providerRow;
}