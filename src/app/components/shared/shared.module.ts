import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';

import { DeleteAlertComponent } from '@shared/delete-alert/delete-alert.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { VideoItemComponent } from '@shared/video-item/video-item.component';

@NgModule({
  declarations: [VideoItemComponent, ModalComponent, DeleteAlertComponent],
  imports: [CommonModule, MaterialModule],
  entryComponents: [DeleteAlertComponent],
  exports: [
    VideoItemComponent,
    ModalComponent,
    DeleteAlertComponent,
    CommonModule,
    MaterialModule,
  ],
})
export class SharedModule {}
