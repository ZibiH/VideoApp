import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@header/header.component';
import { VideoInputComponent } from '@video-input/video-input.component';
import { VideoPreviewComponent } from '@video-preview/video-preview.component';
import { VideoFilterComponent } from '@video-filter/video-filter.component';
import { VideoListComponent } from '@video-list/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoInputComponent,
    VideoPreviewComponent,
    VideoFilterComponent,
    VideoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
