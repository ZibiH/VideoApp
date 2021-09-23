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
    this.resetVideoData();
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
      this.errorMessage = 'This video is already on your list!';
      this.errorState = true;
      return;
    }
    this.videos[0].date = Date.now();
    this.storageService.addVideoToList(this.videos[0]);
    this.successState = true;
  }

  onCancelVideo(): void {
    this.resetVideoData();
  }

  private resetVideoData() {
    this.videos = [];
    this.showingPreview = false;
    this.errorState = false;
    this.successState = false;
  }
}
