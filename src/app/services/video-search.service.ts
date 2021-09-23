import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Video } from '@app/models/video';
import { InputData } from '@app/models/input-data';

@Injectable({
  providedIn: 'root',
})
export class VideoSearchService {
  private env = environment;
  private servData = this.env.servicesData;
  private backendUrl = this.env.backend.url;

  videoList: Video[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

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
}
