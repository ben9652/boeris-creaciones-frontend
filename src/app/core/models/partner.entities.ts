import { User } from "./user.entities";

export interface PartnerType {
    id: number;
    role: string;
    explanation_role: string;
}

function equalsRole(a: PartnerType, b: PartnerType): boolean {
    return a.id === b.id;
}

export function equalsArraysRoles(a: PartnerType[], b: PartnerType[]): boolean {
    if(a == null || b == null) return false;
    if(a.length !== b.length) return false;

    for(let i = 0; i < a.length; ++i) {
        if(!equalsRole(a[i], b[i])) return false;
    }

    return true;
}

export interface Partner extends User {
    partnerRoles: PartnerType[];
}

export class PartnerRegister {
    private nombre: string;
    private apellido?: string;
    private email: string;

    constructor(
        firstName: string,
        email: string,
        lastName?: string,
    ) {
        this.nombre = firstName;
        this.apellido = lastName;
        this.email = email;
    }
    
    public get _firstName(): string {
        return this.nombre;
    }
    public get _lastName(): string | undefined {
        return this.apellido;
    }
    public get _email(): string {
        return this.email;
    }
}