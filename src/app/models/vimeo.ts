export interface Vimeo {
  name: string;
  pictures: {
    sizes: {
      link: string;
      link_with_play_button: string;
    }[];
  };
  description: string;
  metadata: {
    connections: {
      likes: {
        total: number;
      };
    };
  };
}
