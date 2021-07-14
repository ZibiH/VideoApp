// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  credentials: {
    clientId: 'ce4c2f556acbe99ecae7bb45deaf14c56e12e650',
    clientSecret:
      'Q1qgqlAFtTUAghKVeBT6e9f1MVjjKet5AuONBOccrq10hQGyYbQTi6XgPwVmPE3DK3D14gv8bYgnxvTtmIufb3c/4SW14EhHgte1Oq8dIwfjn90SCraseA5zVLq1wcyp',
  },
  servicesData: [
    {
      service: 'youtube',
      regEx: '(.*?)(^|/|v=)([a-z0-9_-]{11})(.*)?',
      flags: 'gim',
      replaceValue: '$3',
      iframeUrl: '//www.youtube.com/embed/',
      apiKey: 'AIzaSyD6aVC6lTRy5FdaGzWIH5Ec2Ol_7oKJLhU',
      apiParts: 'snippet,statistics',
      apiUrl: 'https://www.googleapis.com/youtube/v3/videos?id=',
    },
    {
      service: 'vimeo',
      regEx:
        '(?:http:|https:|)\\/\\/(?:player.|www.)?vimeo\\.com\\/(?:video\\/|embed\\/|watch\\?\\S*v=|v\\/)?(\\d*)(.*)?',
      flags: 'g',
      replaceValue: '$1',
      iframeUrl: '//player.vimeo.com/video/',
      apiKey: '',
      apiParts: '',
      apiUrl: 'https://api.vimeo.com/videos/',
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
