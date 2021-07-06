import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { VideoInputComponent } from './components/video-searcher/video-input/video-input.component';
import { VideoPreviewComponent } from './components/video-searcher/video-preview/video-preview.component';
import { VideoFilterComponent } from './components/video-playlist/video-filter/video-filter.component';
import { VideoListComponent } from './components/video-playlist/video-list/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoInputComponent,
    VideoPreviewComponent,
    VideoFilterComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
