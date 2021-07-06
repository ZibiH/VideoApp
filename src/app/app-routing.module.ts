import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoFilterComponent } from './components/video-playlist/video-filter/video-filter.component';
import { VideoInputComponent } from './components/video-searcher/video-input/video-input.component';

const routes: Routes = [
  { path: 'add-video', component: VideoInputComponent, pathMatch: 'full' },
  { path: 'playlist', component: VideoFilterComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'add-video', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
