export const environment = {
  production: true,
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
    url: 'http://localhost:3000/',
  },
};
