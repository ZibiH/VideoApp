import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  isModalActive = false;

  constructor() {}

  ngOnInit(): void {}

  onShowModal() {
    this.isModalActive = true;
  }

  onCloseModal() {
    this.isModalActive = false;
  }
}
