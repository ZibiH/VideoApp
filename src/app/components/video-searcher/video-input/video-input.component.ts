import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { VideoSearchService } from '@app/services/video-search.service';
import { StorageService } from '@app/services/storage.service';

import { Video } from '@app/models/video';
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
    private storage: StorageService
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
        this.errorMessage = `It doesn't looks like ${videoData.videoService} url/id, try again!`;
        this.errorState = true;
        console.error(error.message);
      }
    );
    form.resetForm();
  }

  onAddVideo(): void {
    this.videos[0].date = Date.now();
    this.storage.addVideoToList(this.videos[0]);
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
