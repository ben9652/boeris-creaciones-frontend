export interface Usuario {
    id_usuario: number;
    username: string;
    apellidos: string;
    nombres: string;
    rol: string;
}

export interface UsuarioRegistro {
    username: string;
    nombres: string;
    apellidos: string;
    password: string;
}

export interface UsuarioLogin {
    username: string;
    password: string;
}