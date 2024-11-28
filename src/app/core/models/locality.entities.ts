import { BranchBase } from "./branch.entities";
import { areProvincesEqual, Province } from "./province.entities";

export interface LocalityBase{
    id: number
    name: string
}

export interface Locality extends LocalityBase {
    province: Province
}

export function areLocalitiesEqual(obj1: Locality | null, obj2: Locality | null) {
    if(obj1 !== null && obj2 !== null) {
        if(obj1.id !== obj2.id)
            return false;
        if(obj1.name !== obj2.name)
            return false;
        if(!areProvincesEqual(obj1.province, obj2.province))
            return false;
    }
    else if(obj1 === null || obj2 === null)
        return false;

    return true;
}