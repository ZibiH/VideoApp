import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

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

  videosStorageListChange = new Subject<Video[]>();
  private showingFavorites = false;

  private videosStorageList: Video[] = [];

  constructor(
    // private http: HttpClient,
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
    this.videosStorageListChange.next(this.videosStorageList);
  }

  checkLocalStorageExistance(): boolean {
    const actualLocalStorageData = localStorage.getItem(
      this.videoLocalStorageKey
    );
    return actualLocalStorageData ? true : false;
  }

  checkLocalStorageVideoItem(video: Video): boolean {
    this.getSavedVideos();
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

  // ACTION BUTTONS HANDLING

  addToFavourites(video: Video) {
    const videosList = this.videosStorageList.slice();
    const videoIndex = videosList.findIndex(
      (videoEl) => videoEl.id === video.id
    );
    videosList[videoIndex].favourites = !videosList[videoIndex].favourites;
    this.videosStorageList = videosList;
    this.setLocalStorageVideoItem();
    this.videosStorageListChange.next(this.videosStorageList);
  }

  deleteVideoFromStorage(video: Video) {
    const videosList = this.videosStorageList.slice();

    this.videosStorageList = videosList.filter(
      (videoEl) => videoEl.id !== video.id
    );
    this.setLocalStorageVideoItem();
    this.videosStorageListChange.next(this.videosStorageList);
  }

  showFavorites() {
    this.showingFavorites = !this.showingFavorites;
    if (this.showingFavorites) {
      const favoritesList = this.videosStorageList.filter(
        (video) => video.favourites
      );
      this.videosStorageListChange.next(favoritesList);
      return;
    }
    this.videosStorageListChange.next(this.videosStorageList);
  }

  // ************************
  // ************************
  // ****   Server DB    ****
  // ************************
  // ************************

  // checkServerDbExistance() {}

  // checkServerDbVideoItem() {}

  // addToServerDb(video: Video): void {
  //   const videoItem = JSON.stringify(video);
  //   this.http.post(this.videoLocalApiUrl, videoItem, this.videoLocalApiHeaders);
  // }

  // getLocalDbVideos(): Observable<Video[]> {
  //   return this.http.get<Video[]>(this.videoLocalApiUrl);
  // }
}
