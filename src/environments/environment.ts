// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDxpXAY0dTU0ZGpfBCh8gz2T4vjVaUg2mw',
    authDomain: 'dataxer-aab65.firebaseapp.com',
    databaseURL: 'https://dataxer-aab65.firebaseio.com',
    projectId: 'dataxer-aab65',
    storageBucket: 'dataxer-aab65.appspot.com',
    messagingSenderId: '435240210643',
    appId: '1:435240210643:web:3697dbe71e8e30ab124426',
    measurementId: 'G-4ZZ6K78X6B'
  },
  baseUrl: 'http://localhost:8080/api'
  //baseUrl: 'https://dataid.dataxer.com/api',
  //baseUrl: 'https://dataxer.herokuapp.com/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
