import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/components/button/button';
import {FileUploadModule} from 'primeng/components/fileupload/fileupload';
import {SliderModule} from 'primeng/components/slider/slider';

import {CropperControlsComponent} from './cropper-controls.component';
import {CropperComponent} from './cropper.component';
import {CropperContainer} from './cropper.container';
import {CropperZoomComponent} from './cropper-zoom.component';
import {CropperUploadComponent} from './cropper-upload.component';


@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    SliderModule,
  ],
  declarations: [
    CropperControlsComponent,
    CropperComponent,
    CropperContainer,
    CropperUploadComponent,
    CropperZoomComponent,
  ],
  exports: [
    CropperContainer,
  ],
})
export class AppCropperModule {
}
