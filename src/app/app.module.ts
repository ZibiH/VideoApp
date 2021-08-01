import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@header/header.component';
import { VideoInputComponent } from './components/video-input/video-input.component';
import { VideoListComponent } from './components/video-playlist/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoInputComponent,
    VideoListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
