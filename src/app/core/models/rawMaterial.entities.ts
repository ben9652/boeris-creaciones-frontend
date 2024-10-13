import { Category } from "./category.entities"

export interface Unit {
    id: number,
    name: string
}

export interface Source {
    label: string,
    value: string
}

export interface RawMaterial {
    id: number | null,
    category: Category | null,
    unit: Unit | null,
    name: string | null,
    source: string | null,
    stock: number | null,
    picture: string | null,
    comment?: string | null
}

export function isRawMaterialNull(rawMaterial: RawMaterial): boolean {
    const id: boolean = rawMaterial.id === 0;
    const category: boolean = rawMaterial.category === null;
    const unit: boolean = rawMaterial.unit === null;
    const name: boolean = rawMaterial.name === null;
    const source: boolean = rawMaterial.source === null;
    const stock: boolean = rawMaterial.stock === 0;
    const picture: boolean = rawMaterial.picture === 'pictures/leaf-solid.svg';
    const comment: boolean = rawMaterial.comment === null;

    return id && category && unit && name && source && stock && picture && comment;
}

export function areRawMaterialsEqual(obj1: RawMaterial | null, obj2: RawMaterial | null): boolean {
    if(obj1 !== null && obj2 !== null) {
        if(obj1.id !== obj2.id)
            return false;
        if(obj1.category?.id !== obj2.category?.id || obj2.category?.name !== obj2.category?.name)
            return false;
        if(obj1.unit?.id !== obj1.unit?.id || obj2.unit?.name !== obj2.unit?.name)
            return false;
        if(obj1.name !== obj2.name)
            return false;
        if(obj1.source !== obj2.source)
            return false;
        if(obj1.stock !== obj2.stock)
            return false;
        if(obj1.picture !== obj2.picture)
            return false;
        if(obj1.comment !== obj2.comment)
            return false;
    }
    else if(obj1 === null || obj2 === null) {
        return false;
    }
    
    return true;
}

export function constructNullRawMaterial(): RawMaterial {
    let newRawMaterial: RawMaterial = {
        id: 0,
        category: null,
        unit: null,
        name: null,
        source: null,
        stock: 0,
        picture: 'pictures/leaf-solid.svg',
        comment: null
    }

    return newRawMaterial;
}
