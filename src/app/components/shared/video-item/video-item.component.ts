import { Component, Input } from '@angular/core';

import { StorageService } from '@app/services/storage.service';

import { Video } from '@app/models/video';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent {
  @Input() video!: Video;
  @Input() displayStyle!: string;
  isModalActive = false;

  constructor(private storageService: StorageService) {}

  onToggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  onBackdropClick(event: MouseEvent) {
    const clickedObj = event.target as HTMLElement;
    if (clickedObj.id === 'modal') {
      this.isModalActive = false;
    }
  }

  onAddToFavourite(video: Video) {
    this.storageService.addToFavourites(video);
  }
}
