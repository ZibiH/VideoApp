import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Video } from '@app/models/video';
import { InputData } from '@app/models/input-data';
import { Youtube } from '@app/models/youtube';
import { Vimeo } from '@app/models/vimeo';

@Injectable({
  providedIn: 'root',
})
export class VideoSearchService {
  private env = environment;
  private servData = this.env.servicesData;
  private youtubeEnv = this.servData[0];
  private vimeoEnv = this.servData[1];
  private vimeoViewsCount = '0';
  private vimeoService = this.vimeoEnv.service;
  private youtubeService = this.youtubeEnv.service;
  private backendUrl = this.env.backend.url;

  private credentials = btoa(
    `${this.vimeoEnv.clientId}:${this.vimeoEnv.clientSecret}`
  );
  private vimeoHeaders = {
    headers: new HttpHeaders({
      Authorization: `basic ${this.credentials}`,
    }),
  };
  videoList: Video[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  fetchVideoApiData(videoData: InputData): Observable<Video> {
    const apiUrl = this.getProperVideoUrl(videoData);
    if (videoData.videoService === this.vimeoService) {
      return this.fetchVimeoVideoData(apiUrl);
    }
    return this.fetchYoutubeVideoData(apiUrl);
  }

  private fetchYoutubeVideoData(apiUrl: string): Observable<Video> {
    return this.http.get<Youtube>(apiUrl).pipe(
      map((videoData: Youtube) => {
        const safeSrc = this.sanitizeVideoSrc(
          this.youtubeEnv.iframeUrl + videoData.items[0].id
        );

        const video = {
          service: this.youtubeEnv.service,
          id: videoData.items[0].id,
          title: videoData.items[0].snippet.title,
          description: videoData.items[0].snippet.description.slice(0, 80),
          src: this.youtubeEnv.iframeUrl + videoData.items[0].id,
          safeSrc: safeSrc,
          picture: videoData.items[0].snippet.thumbnails.high.url,
          likes: videoData.items[0].statistics.likeCount,
          views: videoData.items[0].statistics.viewCount,
          favourites: false,
        };
        return video;
      })
    );
  }

  private fetchVimeoVideoData(apiUrl: string): Observable<Video> {
    return this.http.get<Vimeo>(apiUrl, this.vimeoHeaders).pipe(
      map((videoData: Vimeo) => {
        const vimeoId = this.extractIdFromInputData({
          videoUrl: videoData.link,
          videoService: this.vimeoService,
        });
        const safeSrc = this.sanitizeVideoSrc(
          this.vimeoEnv.iframeUrl + vimeoId
        );

        const video = {
          service: this.vimeoEnv.service,
          id: vimeoId,
          title: videoData.name,
          description: videoData.description,
          src: this.vimeoEnv.iframeUrl + vimeoId,
          safeSrc: safeSrc,
          picture: videoData.pictures.sizes[3].link,
          likes: videoData.metadata.connections.likes.total.toString(),
          views: this.vimeoViewsCount,
          favourites: false,
        };
        return video;
      })
    );
  }

  private getProperVideoUrl(videoData: InputData): string {
    const videoId: string = this.extractIdFromInputData(videoData);
    if (videoData.videoService === this.youtubeService) {
      return `${this.servData[0].apiUrl}${videoId}&key=${this.servData[0].apiKey}&part=${this.servData[0].apiParts}`;
    }
    if (videoData.videoService === this.vimeoService) {
      return `${this.servData[1].apiUrl}${videoId}`;
    }
    return '';
  }

  private extractIdFromInputData(videoData: InputData): string {
    const { regEx, replaceValue, flags } = this.servData.filter(
      (data) => data.service === videoData.videoService
    )[0];
    const pattern = new RegExp(regEx, flags);
    const extractedId = videoData.videoUrl.replace(pattern, replaceValue);
    return extractedId;
  }

  sanitizeVideoSrc(unsafeSrc: string): SafeResourceUrl {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeSrc);
    return safeUrl;
  }

  fetchVideoData(inputData: InputData) {
    const videoService = inputData.videoService;
    const videoId = this.extractIdFromInputData(inputData);
    return this.http
      .get<Video>(`${this.backendUrl}${videoService}/${videoId}`)
      .pipe(
        map((vid: Video) => {
          return {
            ...vid,
            safeSrc: this.sanitizeVideoSrc(vid.src),
          };
        })
      );
  }

  fetchDefaultVideoBase() {
    return this.http.get<Video[]>(this.backendUrl + 'default');
  }
}
