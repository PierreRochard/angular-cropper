import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';


@Component({
  selector: 'app-cropper-upload-component',
  template: `
    <p-fileUpload
      [mode]="fileUploadOptions.mode"
      [accept]="fileUploadOptions.accept"
      [maxFileSize]="fileUploadOptions.maxFileSize"
      [auto]="fileUploadOptions.auto"
      [chooseLabel]="fileUploadOptions.chooseLabel"
      [customUpload]="fileUploadOptions.customUpload"
      (uploadHandler)="onUploadImage.emit($event.files[0])"
    >
    </p-fileUpload>
  `,

})
export class CropperUploadComponent {

  public fileUploadOptions: any = {
    mode: 'basic',
    accept: 'image/*',
    maxFileSize: 5e+6,
    auto: true,
    chooseLabel: 'Click to upload',
    customUpload: true,
  };

  @Output() onUploadImage = new EventEmitter<File>();

}
