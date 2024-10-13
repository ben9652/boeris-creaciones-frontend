import { RawMaterial } from "../../../../../core/models/rawMaterial.entities";

export interface RawMaterialRow {
    nonModified: RawMaterial,
    modified: RawMaterial
}