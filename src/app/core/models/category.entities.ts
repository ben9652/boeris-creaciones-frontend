export interface Category {
    id: number,
    name: string
}

export function areCategoriesEqual(obj1: Category | null, obj2: Category | null) {
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