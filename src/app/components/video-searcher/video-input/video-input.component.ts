import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { VideoSearchService } from '@app/services/video-search.service';

import { Video } from '@app/models/video';
import { InputData } from '@app/models/input-data';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss'],
})
export class VideoInputComponent {
  videoService = new FormControl('', Validators.required);
  showingPreview = false;
  videos: Video[] = [];

  constructor(private vsService: VideoSearchService) {}

  onSubmit(form: NgForm): void {
    // Fetch online API
    const videoData: InputData = {
      videoUrl: form.value.videoUrl,
      videoService: form.value.videoService,
    };

    this.vsService
      .fetchVideoApiData(videoData)
      .subscribe((video) => (this.videos = [video]));

    form.resetForm();
    this.showingPreview = true;
  }

  onAddVideo(): void {
    console.log(this.videos);
  }

  onCancelVideo(): void {
    this.videos = [];
    this.showingPreview = false;
  }
}
