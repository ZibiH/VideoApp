import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Video } from '@app/models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoSearchService {
  private videoLocalApiUrl = 'http://localhost:5000/videos';
  videoList: Video[] = [];

  constructor(private http: HttpClient) {}

  fetchVideoServerData(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoLocalApiUrl);
  }

  fetchVideoApiData(videoInput: {
    videoUrl: string;
    videoService: string;
  }): Observable<Video[]> {
    return this.http.get<Video[]>(videoInput.videoUrl);
  }
}
