import { User } from "./user.entities";

interface PartnerType {
    role: string;
    explanation_role: string;
}

export interface Partner {
    user: User;
    roles: PartnerType[];
}