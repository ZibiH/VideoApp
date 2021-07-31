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
    // Fetch online API
    const videoData: InputData = {
      videoUrl: form.value.videoUrl,
      videoService: form.value.videoService,
    };

    this.vsService.fetchVideoApiData(videoData).subscribe(
      (video) => {
        this.videos = [video];
        this.showingPreview = true;
      },
      (error) => {
        if (error.status === undefined) {
          this.errorMessage = 'Wrong service selected, try again!';
          this.errorState = true;
          return;
        }
        if (error.status.toString() === '0') {
          this.errorMessage = 'Wrong url, id or selected service, try again!';
          this.errorState = true;
          return;
        }
        if (error.status === 404) {
          this.errorMessage =
            "Video doesn't exist on selected service, try again!";
          this.errorState = true;
          return;
        }
        this.errorMessage = error.message;
        this.errorState = true;
        return;
      }
    );
    form.resetForm();
  }

  onAddVideo(): void {
    this.videos[0].date = Date.now();
    this.storageService.addVideoToList(this.videos[0]);
    this.videos = [];
    this.showingPreview = false;
    this.errorState = false;
  }

  onCancelVideo(): void {
    this.videos = [];
    this.showingPreview = false;
    this.errorState = false;
  }
}
