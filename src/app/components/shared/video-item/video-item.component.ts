import { Component, Input } from '@angular/core';

import { StorageService } from '@services/storage.service';

import { DeleteAlertComponent } from '@shared/delete-alert/delete-alert.component';
import { MatDialog } from '@angular/material/dialog';

import { Video } from '@models/video';
import { ModalComponent } from '@shared/modal/modal.component';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent {
  @Input() video!: Video;
  @Input() displayStyle!: string;

  constructor(
    private storageService: StorageService,
    private dialog: MatDialog,
    private modal: MatDialog
  ) {}

  onAddToFavourite(video: Video) {
    this.storageService.addToFavourites(video);
  }

  onOpenModal() {
    const modalRef = this.modal.open(ModalComponent, {
      data: {
        ...this.video,
      },
    });
    modalRef.afterClosed().subscribe(() => {
      this.modal.closeAll();
    });
  }

  onOpenDeleteDialog(video: Video) {
    const deleteResult = 'delete';
    const dialogRef = this.dialog.open(DeleteAlertComponent);
    dialogRef.afterClosed().subscribe((result) => {
      result === deleteResult
        ? this.storageService.deleteVideoFromStorage(video)
        : this.dialog.closeAll();
    });
  }
}
