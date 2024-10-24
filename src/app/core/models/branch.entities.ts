export interface Branch {
    id: number,
    name: string | null;
    locality: Locality | null;
    domicile: string | null;
}

export interface BranchRow {
    nonModified: Branch;
    modified: Branch;
}

export interface Locality {
    id: number;
    name: string;
}

export function createNullBranch(): Branch {
    let newBranch: Branch = {
        id: 0,
        name: null,
        locality: null,
        domicile: null
    }
    return newBranch;
}

export function areBranchesEqual(obj1: Branch | null, obj2: Branch | null): boolean {
    if(obj1 !== null && obj2 !== null){
        if(obj1.id !== obj2.id)
            return false;
        if(obj1.name !== obj2.name)
            return false;
        if(obj1.domicile !== obj2.domicile)
            return false;
    } else if(obj1 === null || obj2 === null){
        return false;
    }
    return true;
}

export function createBranchRow(nonModified: Branch, modified: Branch): BranchRow{
    let branchRow: BranchRow = {
        nonModified: createNullBranch(),
        modified: createNullBranch()
    };
    branchRow.nonModified = nonModified;
    branchRow.modified = modified;
    return branchRow;
}