import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoInputComponent } from './components/video-input/video-input.component';
import { VideoListComponent } from './components/video-playlist/video-list.component';

const routes: Routes = [
  {
    path: '',
    component: VideoInputComponent,
    pathMatch: 'full',
  },
  {
    path: 'playlist',
    component: VideoListComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'add-video', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
