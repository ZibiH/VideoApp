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
  isLoading = false;
  showingPreview = false;
  errorMessage: string = '';
  errorState = false;
  successState = false;
  successMessage = 'Video added to your list!';

  constructor(
    private vsService: VideoSearchService,
    private storageService: StorageService
  ) {}

  onSubmit(form: NgForm): void {
    this.errorState = false;
    this.showingPreview = false;
    this.isLoading = true;

    const videoData: InputData = {
      videoUrl: form.value.videoUrl,
      videoService: form.value.videoService,
    };
    this.vsService.fetchVideoData(videoData).subscribe(
      (video: Video) => {
        this.videos = [video];
        this.isLoading = false;
        this.showingPreview = true;
      },
      (error) => {
        this.isLoading = false;
        this.errorState = true;
        this.errorMessage = error.error.message;
      }
    );
    form.resetForm();
  }

  onAddVideo(): void {
    if (this.storageService.checkLocalStorageVideoItem(this.videos[0])) {
      this.errorMessage = 'This video is on your list already!';
      this.errorState = true;
      this.resetVideoData(3000);
      return;
    }
    this.videos[0].date = Date.now();
    this.storageService.addVideoToList(this.videos[0]);
    this.successState = true;
    this.resetVideoData(3000);
  }

  onCancelVideo(): void {
    this.resetVideoData(100);
  }

  private resetVideoData(time: number) {
    setTimeout(() => {
      this.videos = [];
      this.showingPreview = false;
      this.errorState = false;
      this.successState = false;
    }, time);
  }
}
