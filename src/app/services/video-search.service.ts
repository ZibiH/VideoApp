import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  fetchVideoServerData(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoLocalApiUrl);
  }

  fetchVideoApiData(videoData: InputData): Observable<Video> {
    const apiUrl = this.getProperVideoUrl(videoData);
    if (videoData.videoService === 'vimeo') {
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
          id: videoData.items[0].id,
          title: videoData.items[0].snippet.title,
          description: videoData.items[0].snippet.description.slice(0, 80),
          service: this.youtubeEnv.service,
          src: safeSrc,
          likes: videoData.items[0].statistics.likeCount,
          views: videoData.items[0].statistics.viewCount,
          favourites: false,
          date: Date.now(),
        };
        return video;
      })
    );
  }

  private fetchVimeoVideoData(apiUrl: string): Observable<Video> {
    return this.http.get<Vimeo>(apiUrl, this.vimeoHeaders).pipe(
      map((videoData: Vimeo) => {
        console.log(videoData);
        const vimeoId = this.extractIdFromInputData({
          videoUrl: videoData.link,
          videoService: 'vimeo',
        });
        const safeSrc = this.sanitizeVideoSrc(
          this.vimeoEnv.iframeUrl + vimeoId
        );

        const video = {
          id: vimeoId,
          title: videoData.name,
          description: videoData.description,
          service: this.vimeoEnv.service,
          src: safeSrc,
          likes: videoData.metadata.connections.likes.total.toString(),
          favourites: false,
          date: Date.now(),
        };
        return video;
      })
    );
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

  private sanitizeVideoSrc(unsafeSrc: string): SafeResourceUrl {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeSrc);
    return safeUrl;
  }
}
