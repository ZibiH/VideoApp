import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Video } from '@app/models/video';
import { VideoSearchService } from './video-search.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnInit {
  private videoLocalApiUrl = 'http://localhost:5000/videos';
  private videoLocalStorageKey = 'videos';
  private videoLocalApiHeaders = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  private videosStorageList: Video[] = [];

  constructor(
    private http: HttpClient,
    private vsService: VideoSearchService
  ) {}

  ngOnInit() {
    this.getSavedVideos();
  }

  getSavedVideos() {
    if (localStorage.getItem(this.videoLocalStorageKey)) {
      const storageVideos = localStorage.getItem(this.videoLocalStorageKey);
      this.videosStorageList =
        storageVideos !== null ? JSON.parse(storageVideos) : [];
      this.videosStorageList.forEach((video: Video) => {
        video.safeSrc = this.vsService.sanitizeVideoSrc(video.src);
      });
    }
  }

  addVideoToList(video: Video) {
    this.getSavedVideos();
    if (!this.checkLocalStorageVideoItem(video)) {
      this.videosStorageList.push(video);
    }
    this.setLocalStorageVideoItem();
  }

  checkLocalStorageExistance(): boolean {
    const actualLocalStorageData = localStorage.getItem(
      this.videoLocalStorageKey
    );
    return actualLocalStorageData ? true : false;
  }

  checkLocalStorageVideoItem(video: Video): boolean {
    if (!this.videosStorageList) {
      return false;
    }
    const vidExist = this.videosStorageList.find((vid) => vid.id === video.id);
    return vidExist ? true : false;
  }

  setLocalStorageVideoItem() {
    const jsonVideoList = JSON.stringify(this.videosStorageList);
    localStorage.setItem(this.videoLocalStorageKey, jsonVideoList);
  }

  getVideosList() {
    if (this.videosStorageList) {
      this.getSavedVideos();
      return this.videosStorageList.slice();
    }
    return this.videosStorageList;
  }

  addToFavourites(videoId: string) {
    this.getSavedVideos();
    this.videosStorageList.filter((video) => {
      video.id === videoId;
    });
  }

  // ************************
  // ************************
  // ****   Server DB    ****
  // ************************
  // ************************

  checkServerDbExistance() {}

  checkServerDbVideoItem() {}

  addToServerDb(video: Video): void {
    const videoItem = JSON.stringify(video);
    this.http.post(this.videoLocalApiUrl, videoItem, this.videoLocalApiHeaders);
  }

  getLocalDbVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoLocalApiUrl);
  }
}
