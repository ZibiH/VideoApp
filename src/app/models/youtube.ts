export interface Youtube {
  items: {
    id: string;
    player: { embedHtml: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
    statistics: { viewCount: string; likeCount: string };
  }[];
}
