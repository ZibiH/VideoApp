import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Video } from '@app/models/video';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getSavedVideos() {
    let storedVideos!: Video[];

    if (localStorage.getItem(this.videoLocalStorageKey)) {
      const storageVideos = localStorage.getItem(this.videoLocalStorageKey);
      storedVideos = storageVideos !== null ? JSON.parse(storageVideos) : [];
    }

    this.videosStorageList = storedVideos;
  }

  addVideoToList(video: Video) {
    this.getSavedVideos();
    if (!this.checkLocalStorageVideoItem(video)) {
      this.videosStorageList.push(video);
    }
    this.setLocalStorageVideoItem();
    console.log(this.videosStorageList);
  }

  checkLocalStorageExistance(): boolean {
    const actualLocalStorageData = localStorage.getItem(
      this.videoLocalStorageKey
    );
    return actualLocalStorageData ? true : false;
  }

  checkLocalStorageVideoItem(video: Video): boolean {
    return this.videosStorageList.filter((vid) => vid.id === video.id)
      ? true
      : false;
  }

  setLocalStorageVideoItem() {
    const jsonVideoList = JSON.stringify(this.videosStorageList);
    localStorage.setItem(this.videoLocalStorageKey, jsonVideoList);
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
    this.http.put(this.videoLocalApiUrl, videoItem, this.videoLocalApiHeaders);
  }

  getLocalDbVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoLocalApiUrl);
  }
}
