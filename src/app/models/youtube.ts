export interface Youtube {
  items: {
    id: string;
    player: { embedHtml: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: { standard: { url: string } };
    };
    statistics: { viewCount: string; likeCount: string };
  }[];
}
