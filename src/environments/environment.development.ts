export const environment = {
    production: false,

    /*
        Con este atributo proceder como sigue:
            * Cuando se está desarrollando, escribir process.env['API_KEY']
            * Cuando se va a hacer el push, dejarlo como una cadena vacía
    */
    API_KEY: ''
};
