# BoerisCreacionesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Uso de variables de entorno

Para crear la variable con la URL de la API, solo se debe crear el archivo `.env`, y escribir `API_URL=<link_to_API>`..env

Esta variable se podría acceder mediante uno de los archivos `environment` contenidos en `src/environments`. Estos archivos se podrán crear automáticamente ejecutando `set-env.js` (con esto se armarían los archivos environment con las variables de entorno escritas en .env). Se puede hacer esto manualmente con `node ./set-env.js` o, si se quiere ejecutar esto al levantar el servidor, ejecutar `npm start`.

Luego de esto, para acceder a las variables de entorno, se debe importar uno de los objetos environment en el archivo en el que queramos usarlas.
