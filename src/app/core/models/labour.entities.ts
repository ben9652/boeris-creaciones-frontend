import { Locality } from "./locality.entities";
import { Unit } from "./rawMaterial.entities";

export interface Branch {
    id: number;
    name: string;
    locality: Locality
}

export interface RawMaterial {
    id: number;
	unit: Unit
	name: string;
	stock: number;
	discarded: number;
	picture: string;
	branch: Branch;
}