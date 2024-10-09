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
