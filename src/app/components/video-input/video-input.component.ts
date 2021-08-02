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
    this.vsService.fetchVideoApiData(videoData).subscribe(
      (video) => {
        this.videos = [video];
        this.showingPreview = true;
      },
      (error) => {
        this.errorState = true;
        const status = error.status;
        this.fetchApiErrorHandler(status);
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

  private fetchApiErrorHandler(status: number | undefined): void {
    const errorMessage0 = 'Wrong url, id or selected service, try again!';
    const errorMessage400 = 'Wrong service selected, try again!';
    const errorMessage401 =
      "Video doesn't exists or you are not authorized to watch it";
    const errorMessage404 =
      "Video doesn't exist on selected service, try again!";
    const errorMessageDefault = 'Something went wrong, try again!';
    switch (status) {
      case undefined || 400:
        this.errorMessage = errorMessage400;
        break;
      case 0:
        this.errorMessage = errorMessage0;
        break;
      case 401:
        this.errorMessage = errorMessage401;
        break;
      case 404:
        this.errorMessage = errorMessage404;
        break;
      default:
        this.errorMessage = errorMessageDefault;
        break;
    }
  }
}
