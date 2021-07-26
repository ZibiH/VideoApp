import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { StorageService } from '@app/services/storage.service';

import { Video } from '@app/models/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  private videosSubscription!: Subscription;

  videos: Video[] = [];
  sortedVideos: Video[];
  displayStyle = 'list';
  showingFavorites = false;

  PAGE_SIZE = 5;
  START_INDEX = 0;
  paginatedVideos: Video[];

  constructor(private videoStorage: StorageService) {
    this.sortedVideos = this.videos.slice();
    this.paginatedVideos = this.sortedVideos.slice(
      this.START_INDEX,
      this.PAGE_SIZE
    );
  }

  ngOnInit(): void {
    this.videos = this.videoStorage.getVideosList();
    this.videosSubscription =
      this.videoStorage.videosStorageListChange.subscribe((videosList) => {
        this.videos = videosList;
        this.sortedVideos = this.videos;
        this.paginatedVideos = this.sortedVideos.slice(
          this.START_INDEX,
          this.PAGE_SIZE
        );
      });
    this.sortedVideos = this.videos;
    this.paginatedVideos = this.sortedVideos.slice(
      this.START_INDEX,
      this.PAGE_SIZE
    );
  }

  sortVideos(sort: Sort) {
    const data = this.videos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedVideos = data;
      return;
    }

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (+a - +b < 0 ? -1 : 1) * (isAsc ? 1 : -1);
    }

    this.sortedVideos = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'views':
          return compare(a.views!, b.views!, isAsc);
        case 'likes':
          return compare(a.likes, b.likes, isAsc);
        case 'date':
          return compare(a.date!, b.date!, isAsc);
        default:
          return 0;
      }
    });
    this.paginatedVideos = this.sortedVideos;
  }

  onShowFavorites() {
    this.showingFavorites = !this.showingFavorites;
    this.videoStorage.showFavorites();
  }

  onDisplayStyle(event: Event) {
    const target = event.target as HTMLElement;
    const buttonData = target.closest('button');
    if (buttonData) {
      this.displayStyle = <string>buttonData.getAttribute('data-view');
    }
    this.setDisplayStyle();
  }

  setDisplayStyle() {
    const videoViewContainer = document.querySelectorAll('[data-display]');
    videoViewContainer.forEach((videoItem) => {
      videoItem.setAttribute('data-display', this.displayStyle);
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.sortedVideos.length) {
      endIndex = this.sortedVideos.length;
    }
    this.paginatedVideos = this.sortedVideos.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe();
  }
}
