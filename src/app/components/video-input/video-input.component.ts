import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { VideoSearchService } from '@services/video-search.service';
import { StorageService } from '@services/storage.service';

import { Video } from '@models/video';
import { InputData } from '@models/input-data';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss'],
})
export class VideoInputComponent {
  videoService = new FormControl('', Validators.required);
  videos: Video[] = [];
  displayStyle = 'preview';
  showingPreview = false;
  errorMessage: string = '';
  errorState = false;

  constructor(
    private vsService: VideoSearchService,
    private storageService: StorageService
  ) {}

  onSubmit(form: NgForm): void {
    this.errorState = false;
    this.showingPreview = false;

    const videoData: InputData = {
      videoUrl: form.value.videoUrl,
      videoService: form.value.videoService,
    };
    this.vsService.fetchVideoData(videoData).subscribe(
      (video: Video) => {
        this.videos = [video];
        this.showingPreview = true;
      },
      (error) => {
        this.errorState = true;
        this.errorMessage = error.error.message;
      }
    );
    form.resetForm();
  }

  onAddVideo(): void {
    this.videos[0].date = Date.now();
    this.storageService.addVideoToList(this.videos[0]);
    this.resetVideoData();
  }

  onCancelVideo(): void {
    this.resetVideoData();
  }

  private resetVideoData() {
    this.videos = [];
    this.showingPreview = false;
    this.errorState = false;
  }
}
