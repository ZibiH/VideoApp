import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onShowModal() {
    document.querySelector('#modal')?.classList.add('isActive');
  }

  onCloseModal() {
    document.querySelector('#modal')?.classList.remove('isActive');
  }
}
