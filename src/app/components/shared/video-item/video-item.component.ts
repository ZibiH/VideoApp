import { Component, Input } from '@angular/core';

import { StorageService } from '@app/services/storage.service';

import { DeleteAlertComponent } from '@shared/delete-alert/delete-alert.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private storageService: StorageService,
    private dialog: MatDialog
  ) {}

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

  onOpenDialog(video: Video) {
    const dialogRef = this.dialog.open(DeleteAlertComponent);
    dialogRef.afterClosed().subscribe((result) => {
      result === 'delete'
        ? this.storageService.deleteVideoFromStorage(video)
        : this.dialog.closeAll();
    });
  }
}
