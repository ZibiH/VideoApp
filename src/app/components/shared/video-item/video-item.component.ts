import { Component } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent {
  isModalActive = false;

  onToggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  onBackdropClick(event: MouseEvent) {
    const clickedObj = event.target as HTMLElement;
    if (clickedObj.id === 'modal') {
      this.isModalActive = false;
    }
  }
}
