import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { VideoInputComponent } from './video-input.component';

const routes: Routes = [{ path: '', component: VideoInputComponent }];

@NgModule({
  declarations: [VideoInputComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [SharedModule, VideoInputComponent, RouterModule],
})
export class InpuModule {}
