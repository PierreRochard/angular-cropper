import {
  Component,
  ViewChild,
} from '@angular/core';

import {CropperComponent} from 'app/cropper/cropper.component';

@Component({
  selector: 'app-cropper-container',
  template: `
      <div class="ui-g">
          <div class="ui-g-1"></div>
          <div class="ui-g-10">

              <div class="container">
                  <app-cropper-component
                          #cropper
                          [uploadedImage]="uploadedImage"
                          [zoomValue]="zoomValue"
                          (onZoom)="onZoom($event)">
                  </app-cropper-component>
                  <div class="upload-button"
                       *ngIf="(uploadedImage) === null">
                      <app-cropper-upload-component
                              (onUploadImage)="onUploadImage($event)"
                      >
                      </app-cropper-upload-component>
                  </div>
              </div>
          </div>
          <div class="ui-g-1">
              <app-cropper-zoom-component
                      [zoom_slider_value]="zoomValue"
                      (onZoom)="onZoom($event)">
              </app-cropper-zoom-component>
          </div>
          <div class="ui-g-7">
              <app-cropper-controls-component
                      (onRemove)="onRemove()"
                      (onSave)="onSave()"
              ></app-cropper-controls-component>
          </div>
      </div>
  `,
  styles: [`
    .container {
      position: relative;
      max-width: 502px;
      min-width: 502px;
      max-height: 202px;
      min-height: 202px;
      border: 1px solid red;
    }

    .upload-button {
      position: absolute;
      bottom: 50px;
      right: 197px;
    }
  `,
  ],
})
export class CropperContainer {
  public uploadedImage: File = null;
  public zoomValue: number = 1;

  @ViewChild(CropperComponent)
  private cropper: CropperComponent;

  onRemove() {
    this.uploadedImage = null;
    this.zoomValue = 1;
  }

  onUploadImage(uploadedFile: File) {
    this.uploadedImage = uploadedFile;
  }

  onSave() {
    const imageData = this.cropper.get_data();
    console.log(imageData);
    // this.store.dispatch(new UpdateCroppedImageAction(imageData));
  }

  onZoom(event: number) {
    this.zoomValue = event;
  }

}
