import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteAlertComponent } from './components/shared/delete-alert/delete-alert.component';
import { HeaderComponent } from '@header/header.component';
import { VideoInputComponent } from '@video-input/video-input.component';
import { VideoFilterComponent } from '@video-filter/video-filter.component';
import { VideoListComponent } from '@video-list/video-list.component';
import { VideoItemComponent } from './components/shared/video-item/video-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteAlertComponent,
    HeaderComponent,
    VideoInputComponent,
    VideoFilterComponent,
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
