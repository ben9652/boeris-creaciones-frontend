import { areCategoriesEqual, Category } from "./category.entities"
import { RowList } from "./rowList.entities";

export interface Unit {
    id: number;
    name: string;
}

export class Source {
    label: string;
    value: string;

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

export interface RawMaterialBase {
    id: number;
    unit: Unit | null;
    name: string | null;
    source: string | null;
    stock: number | null;
    picture: string | null;
    comment?: string | null;
}

export interface RawMaterial extends RawMaterialBase {
    category: Category | null;
}

export interface RawMaterialRow extends RowList<RawMaterial> {

}

export function createNullRawMaterial(): RawMaterial {
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
        if(!areCategoriesEqual(obj1.category, obj2.category))
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

export function createRawMaterialRow(nonModified: RawMaterial, modified: RawMaterial): RawMaterialRow {
    let rawMaterialRow: RawMaterialRow = {
        nonModified: createNullRawMaterial(),
        modified: createNullRawMaterial()
    };

    rawMaterialRow.nonModified = nonModified;
    rawMaterialRow.modified = modified;

    return rawMaterialRow;
}