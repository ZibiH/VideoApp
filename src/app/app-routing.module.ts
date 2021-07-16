import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoInputComponent } from './components/video-searcher/video-input/video-input.component';
import { VideoListComponent } from './components/video-playlist/video-list/video-list.component';

const routes: Routes = [
  { path: 'add-video', component: VideoInputComponent, pathMatch: 'full' },
  { path: 'playlist', component: VideoListComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'add-video', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
