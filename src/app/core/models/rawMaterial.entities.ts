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