import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from '@shared/delete-alert/delete-alert.component';

import { StorageService } from '@services/storage.service';

import { Video } from '@models/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  private videosSubscription!: Subscription;

  videos: Video[] = [];

  displayStyle = 'list';
  showingFavorites = false;

  private ACTUAL_SORTING: Sort = { active: '', direction: '' };

  private PAGE_SIZE = 6;
  private START_INDEX = 0;
  paginatedVideos: Video[];

  constructor(private videoStorage: StorageService, private dialog: MatDialog) {
    this.paginatedVideos = this.videos.slice(this.START_INDEX, this.PAGE_SIZE);
  }

  ngOnInit(): void {
    this.videos = this.videoStorage.getVideosList();
    this.videosSubscription =
      this.videoStorage.videosStorageListChange.subscribe((videosList) => {
        this.videos = videosList;
        this.paginatedVideos = this.videos.slice(
          this.START_INDEX,
          this.PAGE_SIZE
        );
      });
    this.paginatedVideos = this.videos.slice(this.START_INDEX, this.PAGE_SIZE);
  }

  sortVideos(sort: Sort) {
    this.ACTUAL_SORTING = sort;
    const data = this.videos.slice();
    if (!sort.active || sort.direction === '') {
      this.paginatedVideos = data.slice(this.START_INDEX, this.PAGE_SIZE);
      return;
    }

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (+a - +b < 0 ? -1 : 1) * (isAsc ? 1 : -1);
    }

    const sortedVideos = data.sort((a, b) => {
      const viewsSort = 'views';
      const likesSort = 'likes';
      const dateSort = 'date';
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case viewsSort:
          return compare(a.views!, b.views!, isAsc);
        case likesSort:
          return compare(a.likes, b.likes, isAsc);
        case dateSort:
          return compare(a.date!, b.date!, isAsc);
        default:
          return 0;
      }
    });
    this.videos = sortedVideos;
    this.paginatedVideos = this.videos.slice(this.START_INDEX, this.PAGE_SIZE);
  }

  onShowFavorites() {
    this.showingFavorites = !this.showingFavorites;
    this.videoStorage.showFavorites();
    this.sortVideos(this.ACTUAL_SORTING);
  }

  onDeleteAllVideos() {
    const deleteResult = 'delete';
    const dialogRef = this.dialog.open(DeleteAlertComponent);
    dialogRef.afterClosed().subscribe((result) => {
      result === deleteResult
        ? this.videoStorage.deleteAllVideosFromStorage()
        : this.dialog.closeAll();
    });
  }

  onDisplayStyle(event: Event) {
    const target = event.target as HTMLElement;
    const buttonData = target.closest('button');
    if (buttonData) {
      this.displayStyle = <string>buttonData.getAttribute('data-view');
    }
    this.setDisplayStyle();
  }

  onUploadDefaultVideoList() {
    this.videoStorage.getLocalDbVideos();
  }

  setDisplayStyle() {
    const videoItemContainer = document.querySelectorAll('[data-display]');
    const videoListContainer = document.querySelector('.playlist__items');

    videoItemContainer.forEach((videoItem) => {
      videoItem.setAttribute('data-display', this.displayStyle);
    });
    if (videoListContainer) {
      videoListContainer.className = `playlist__items ${this.displayStyle}`;
    }
  }

  onPageChange(event: PageEvent) {
    this.START_INDEX = event.pageIndex * event.pageSize;
    this.PAGE_SIZE = this.START_INDEX + event.pageSize;
    if (this.PAGE_SIZE > this.videos.length) {
      this.PAGE_SIZE = this.videos.length;
    }
    this.paginatedVideos = this.videos.slice(this.START_INDEX, this.PAGE_SIZE);
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe();
  }
}
