import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { VideoListComponent } from '@video-playlist/video-list.component';

const routes: Routes = [{ path: '', component: VideoListComponent }];

@NgModule({
  declarations: [VideoListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [SharedModule, VideoListComponent, RouterModule],
})
export class PlaylistModule {}
