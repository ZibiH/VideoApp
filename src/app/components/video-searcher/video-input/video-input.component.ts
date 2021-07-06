import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss'],
})
export class VideoInputComponent {
  videoService = new FormControl('', Validators.required);

  onSubmit(form: NgForm): void {
    const videoUrl = form.value.videoUrl;
    const videoService = form.value.videoService;

    console.log(videoUrl, videoService);

    form.resetForm();
  }
}
