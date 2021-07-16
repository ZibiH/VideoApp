import { Component, OnInit } from '@angular/core';

import { StorageService } from '@app/services/storage.service';

import { Video } from '@app/models/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoStorage: StorageService) {}

  ngOnInit(): void {
    this.videos = this.videoStorage.getVideosList();
  }
}
