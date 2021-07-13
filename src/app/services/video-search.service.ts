import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { Video } from '@app/models/video';
import { InputData } from '@app/models/input-data';

@Injectable({
  providedIn: 'root',
})
export class VideoSearchService {
  private env = environment;
  private servData = this.env.servicesData;
  private videoLocalApiUrl = 'http://localhost:5000/videos';
  private credentials = btoa(
    `${this.env.credentials.clientId}:${this.env.credentials.clientSecret}`
  );
  private vimeoHeaders = {
    headers: new HttpHeaders({
      Authorization: `basic ${this.credentials}`,
    }),
  };
  videoList: Video[] = [];

  constructor(private http: HttpClient) {}

  fetchVideoServerData(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoLocalApiUrl);
  }

  fetchVideoApiData(videoData: InputData): Observable<Video[]> {
    const apiUrl = this.getProperVideoUrl(videoData);
    if (videoData.videoService === 'vimeo') {
      return this.http.get<Video[]>(apiUrl, this.vimeoHeaders);
    }
    return this.http.get<Video[]>(apiUrl);
  }

  private getProperVideoUrl(videoData: InputData): string {
    const videoId: string = this.extractIdFromInputData(videoData);
    let videoProperUrl: string;
    switch (videoData.videoService) {
      case 'youtube':
        videoProperUrl = `${this.servData[0].apiUrl}${videoId}&key=${this.servData[0].apiKey}&part=${this.servData[0].apiParts}`;
        break;
      case 'vimeo':
        videoProperUrl = `${this.servData[1].apiUrl}${videoId}`;
        break;
      default:
        videoProperUrl = '';
        break;
    }

    return videoProperUrl;
  }

  private extractIdFromInputData(videoData: InputData): string {
    const { regEx, replaceValue, flags } = this.servData.filter(
      (data) => data.service === videoData.videoService
    )[0];
    const pattern = new RegExp(regEx, flags);
    const extractedId = videoData.videoUrl.replace(pattern, replaceValue);
    return extractedId;
  }
}
