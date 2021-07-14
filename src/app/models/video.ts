import { SafeResourceUrl } from '@angular/platform-browser';

export interface Video {
  id: string;
  title: string;
  description: string;
  service: string;
  src: SafeResourceUrl;
  likes: string;
  views?: string;
  favourites: boolean;
  date: number;
}
