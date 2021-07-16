import { SafeResourceUrl } from '@angular/platform-browser';

export interface Video {
  service: string;
  id: string;
  title: string;
  description: string;
  safeSrc: SafeResourceUrl;
  src: string;
  picture?: string;
  likes: string;
  views?: string;
  favourites: boolean;
  date?: number;
}
