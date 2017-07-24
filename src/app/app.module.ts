import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule} from 'primeng/components/button/button';
import {DialogModule} from 'primeng/components/dialog/dialog';

import {AppComponent} from './app.component';
import {AppCropperModule} from './cropper/cropper.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppCropperModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    DialogModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
