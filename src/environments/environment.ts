// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  ws_url: 'wss://demoapi.night2stay.com/api/v2/websocket',

  authRequest: {
    "action": "login",
    "data": {
      "key": "123123 ",
      "wlcompany": "CMPN00000053"
    },
    "key": "4bd97223-9ad0-4261-821d-3e9ffc356e32",
    "type":"account"
  },

  findHotelsRequest: {
    "action": "accommodation",
    "data": {
      "place": {
        "in": "CI266088ZZ"
      },
      "date": {
        "in": 1549756800000,
        "out": 1549929600000
      },
      "families": [{"adults": 2}],
      "lastid": 0,
      "num": 5
    },
    "key": "2ee1edbf-d90f-4785-b9db-5b07ce70a928",
    "type": "service"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
