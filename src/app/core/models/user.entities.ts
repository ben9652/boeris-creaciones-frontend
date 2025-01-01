export interface User {
    id_user: number;
    username: string;
    lastName?: string;
    firstName: string;
    email: string;
    role: string;
}

export function createEmptyUser(): User {
    return {
        id_user: 0,
        username: '',
        firstName: '',
        email: '',
        role: ''
    };
}