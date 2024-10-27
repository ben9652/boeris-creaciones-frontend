export interface Province {
    id: number;
    name: string;
}

export function areProvincesEqual(obj1: Province | null, obj2: Province | null): boolean {
    if(obj1 !== null && obj2 !== null) {
        if(obj1.id !== obj2.id)
            return false;
        if(obj1.name !== obj2.name)
            return false;
    }
    else if(obj1 === null || obj2 === null)
        return false;

    return true;
}