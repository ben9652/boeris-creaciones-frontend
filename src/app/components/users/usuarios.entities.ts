export class Usuario {
    id_usuario: number;
    username: string;
    apellidos: string;
    nombres: string;
    email: string;
    rol: string;

    constructor();

    constructor(
        id_usuario: number,
        username: string,
        apellidos: string,
        nombres: string,
        email: string,
        rol: string
    );

    constructor(...args: any[]) {
        if(args.length === 0) {
            this.id_usuario = 0;
            this.username = '';
            this.apellidos = '';
            this.nombres = '';
            this.email = '';
            this.rol = '';
        }
        else {
            this.id_usuario = args[0];
            this.username = args[1];
            this.apellidos = args[2];
            this.nombres = args[3];
            this.email = args[4];
            this.rol = args[5];
        }
    }
}

export class UsuarioRegistro {
    username: string;
    apellidos: string;
    nombres: string;
    email: string;
    password: string;

    constructor();

    constructor(
        username: string,
        apellidos: string,
        nombres: string,
        email: string,
        password: string
    );

    constructor(...args: any[]) {
        if(args.length === 0) {
            this.username = '';
            this.apellidos = '';
            this.nombres = '';
            this.email = '';
            this.password = '';
        }
        else {
            this.username = args[0];
            this.apellidos = args[1];
            this.nombres = args[2];
            this.email = args[3];
            this.password = args[4];
        }
    }
}

export class UsuarioLogin {
    username: string;
    password: string;

    constructor();

    constructor(
        username: string,
        password: string
    );

    constructor(...args: any[]) {
        if(args.length === 0) {
            this.username = '';
            this.password = '';
        }
        else {
            this.username = args[0];
            this.password = args[1];
        }
    }
}