import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
// import { map } from 'rxjs/operators';

import { Video } from '@app/models/video';
import { VideoSearchService } from '@services/video-search.service';

import { videosDemo } from '@assets/videosDemo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
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
  private favoriteVideosList: Video[] = [];
  private videosDemo = videosDemo;

  constructor(
    private http: HttpClient,
    private vsService: VideoSearchService
  ) {}

  getSavedVideos() {
    if (localStorage.getItem(this.videoLocalStorageKey)) {
      const storageVideos = localStorage.getItem(this.videoLocalStorageKey);
      this.videosStorageList =
        storageVideos !== null ? JSON.parse(storageVideos) : [];
      this.videosStorageList = this.videosStorageList.map((video: Video) => ({
        ...video,
        safeSrc: this.vsService.sanitizeVideoSrc(video.src),
      }));
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
    return !!localStorage.getItem(this.videoLocalStorageKey);
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

  getFavoritesVideos() {
    this.favoriteVideosList = this.videosStorageList.filter(
      (video) => video.favourites
    );
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
    this.getFavoritesVideos();
    this.showingFavorites
      ? this.videosStorageListChange.next(this.favoriteVideosList)
      : this.videosStorageListChange.next(this.videosStorageList);
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
      this.getFavoritesVideos();
      this.videosStorageListChange.next(this.favoriteVideosList);
      return;
    }
    this.videosStorageListChange.next(this.videosStorageList);
  }

  deleteAllVideosFromStorage() {
    localStorage.clear();
    this.videosStorageList = [];
    this.videosStorageListChange.next(this.videosStorageList);
  }

  // ************************
  // ****   Server DB    ****
  // ************************

  // Left here for the optional future use
  // private addToServerDb(): void {
  //   this.http
  //     .post<Video[]>(
  //       this.videoLocalApiUrl,
  //       this.videosStorageList,
  //       this.videoLocalApiHeaders
  //     )
  //     .subscribe((response) => console.log(response));
  // }

  getLocalDbVideos(): void {
    // ********************************************************
    // Uncomment this part to use local server data (port:5000)
    // ********************************************************

    // this.http
    //   .get<Array<Video[]>>(this.videoLocalApiUrl)
    //   .pipe(map((videoArray: Video[][]) => videoArray[0]))
    //   .subscribe(
    //     (videoList: Video[]) => {
    //       videoList.forEach((video: Video) => {
    //         const vidItem = video;
    //         vidItem.safeSrc = this.vsService.sanitizeVideoSrc(vidItem.src);
    //         this.addVideoToList(vidItem);
    //       });
    //       this.getSavedVideos();
    //       this.getFavoritesVideos();
    //     },
    //     (error) => console.log(error.message)
    //   );

    // *****************************************************
    // Comment-out this part if you want to use local server
    // *****************************************************

    this.videosDemo.forEach((video: Video) => {
      const vidItem = video;
      vidItem.safeSrc = this.vsService.sanitizeVideoSrc(vidItem.src);
      this.addVideoToList(vidItem);
    });
    this.getSavedVideos();
    this.getFavoritesVideos();
  }
}
