// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// const packageJson = require('../../package.json');



export const environment = {
  production: false,
  appName: 'Angular Seed',
  envName: 'DEV',
  isDebugMode: true,
  Server: 'http://localhost:11312/',
  ApiUrlPrefix: 'api/',
  baseApiEndpoint: 'http://localhost:11312/api/',
  versions: {
    // app: packageJson.version,
    // angular: packageJson.dependencies['@angular/core'],
    // ngrx: packageJson.dependencies['@ngrx/store'],
    // material: packageJson.dependencies['@angular/material'],
    // bootstrap: packageJson.dependencies.bootstrap,
    // rxjs: packageJson.dependencies.rxjs,
    // angularCli: packageJson.devDependencies['@angular/cli'],
    // typescript: packageJson.devDependencies['typescript']
  }
};
