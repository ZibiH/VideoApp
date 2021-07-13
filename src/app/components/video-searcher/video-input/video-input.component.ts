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
  videos: Video[] = [];

  constructor(private vsService: VideoSearchService) {}

  onSubmit(form: NgForm): void {
    const videoUrl = form.value.videoUrl;
    const videoService = form.value.videoService;

    // TODO: add correct fetching video preview (the current fn works with the given id and local server only)
    this.vsService.fetchVideoServerData().subscribe((videos: Video[]) => {
      const vid = videos.find((video: Video) => {
        return video.id === videoUrl;
      });
      if (vid) {
        this.videos?.push(vid);
      }
    });
    form.resetForm();
  }
}
