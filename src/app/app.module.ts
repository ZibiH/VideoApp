import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistModule } from './components/video-playlist/playlist.module';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@header/header.component';
import { VideoInputComponent } from './components/video-input/video-input.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, VideoInputComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PlaylistModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
