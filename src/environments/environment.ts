export const environment = {
  production: false,
  servicesData: [
    {
      service: 'youtube',
      regEx: '(.*?)(^|/|v=)([a-z0-9_-]{11})(.*)?',
      flags: 'gim',
      replaceValue: '$3',
      iframeUrl: '//www.youtube.com/embed/',
      apiKey: 'YOUTUBE_API_KEY',
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
      clientId: 'VIMEO_CLIENT_ID',
      clientSecret: 'VIMEO_CLIENT_SECRET',
    },
  ],
};
