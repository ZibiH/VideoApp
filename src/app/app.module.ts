import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@app/material.module';

import { AppComponent } from '@app/app.component';
import { DeleteAlertComponent } from '@shared/delete-alert/delete-alert.component';
import { HeaderComponent } from '@header/header.component';
import { VideoInputComponent } from '@video-input/video-input.component';
import { VideoItemComponent } from '@shared/video-item/video-item.component';
import { VideoListComponent } from '@video-playlist/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteAlertComponent,
    HeaderComponent,
    VideoInputComponent,
    VideoListComponent,
    VideoItemComponent,
  ],
  entryComponents: [DeleteAlertComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
