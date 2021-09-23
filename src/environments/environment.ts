export const environment = {
  production: false,
  servicesData: [
    {
      service: 'youtube',
      regEx: '(.*?)(^|/|v=)([a-z0-9_-]{11})(.*)?',
      flags: 'gim',
      replaceValue: '$3',
    },
    {
      service: 'vimeo',
      regEx:
        '(?:http:|https:|)\\/\\/(?:player.|www.)?vimeo\\.com\\/(?:video\\/|embed\\/|watch\\?\\S*v=|v\\/)?(\\d*)(.*)?',
      flags: 'g',
      replaceValue: '$1',
    },
  ],
  backend: {
    url: 'https://video-app-zh.herokuapp.com/',
  },
};
