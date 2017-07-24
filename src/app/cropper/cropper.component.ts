import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import * as Cropper from 'cropperjs';

@Component({
  selector: 'app-cropper-component',
  template: `
    <img #image
         *ngIf="imageUrl !== null"
         class="image-cropper"
         [src]="imageUrl"
         (load)="cropperLoad()">
    <div *ngIf="imageUrl === null"
         class="img-placeholder">
      <img src="assets/crop-placeholder.svg">
    </div>
      <canvas #fullCanvas></canvas>
  `,
  styles: [`
    .image-cropper {
      max-width: 100%;
    }
  `,
  ],
})
export class CropperComponent {
  @ViewChild('image') image: ElementRef;
  @ViewChild('fullCanvas') fullCanvas: ElementRef;

  @Output() onZoom = new EventEmitter<number>();

  @Input()
  set zoomValue(value: number) {
    this._zoomValue = value;
    if (this._cropper !== null) {
      this._cropper.zoomTo(value);
    }
  }

  get zoomValue() {
    return this._zoomValue;
  }

  @Input()
  set uploadedImage(uploaded_image: File) {
    if (uploaded_image !== null) {
      this.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(uploaded_image));
    } else {
      this.imageUrl = null;
    }
    if (this._cropper !== null) {
      this._cropper.destroy();
    }
    this._uploadedImage = uploaded_image;
  }

  cropperOptions: Cropper.CropperOptions;
  croppedCanvasOptions: Cropper.CroppedCanvasOptions;
  imageUrl: SafeResourceUrl = null;
  private _cropper: Cropper = null;
  private _uploadedImage: File = null;
  private _zoomValue: number;

  constructor(private _sanitizer: DomSanitizer) {
    this.cropperOptions = {
      'dragMode': 'move',
      'minContainerHeight': 108,
      'minContainerWidth': 270,
      'minCropBoxHeight': 108,
      'minCropBoxWidth': 270,
      'cropBoxMovable': false,
      'cropBoxResizable': false,
      'movable': true,
      'rotatable': false,
      'zoomOnWheel': false,
      'zoomOnTouch': false,
      'background': false,
      'guides': false,
      'highlight': false,
      'center': false,
      'autoCrop': false,
      'autoCropArea': 1,
    };
    this.croppedCanvasOptions = {
      width: 270,
      height: 108,
      fillColor: '#fff'
    };
  }

  cropperLoad() {
    const that = this;
    this._cropper = new Cropper(this.image.nativeElement as HTMLImageElement,
      Object.assign({}, this.cropperOptions, {
        ready: function () {
          const image_data: Cropper.ImageData = that._cropper.getImageData();
          const x_scale: number = 270 / image_data.naturalWidth;
          const y_scale: number = 108 / image_data.naturalHeight;
          let auto_zoom: number = Math.min.apply(Math, [x_scale, y_scale]);
          auto_zoom = parseFloat(auto_zoom.toFixed(2)) - 0.1;
          auto_zoom = Math.max.apply(Math, [auto_zoom, 0.1]);
          that.onZoom.emit(auto_zoom);
        },
      }));
  }

  get_data() {
    this.fullCanvas.nativeElement.height = 108;
    this.fullCanvas.nativeElement.width = 270;
    this.fullCanvas.nativeElement.style.display = 'none';
    console.log(this.fullCanvas);
    const full_canvas_context = this.fullCanvas.nativeElement.getContext('2d');
    full_canvas_context.fillStyle = 'white';
    full_canvas_context.fillRect(0, 0, 270, 108);
    const cropped_canvas: HTMLCanvasElement = this._cropper.getCroppedCanvas(this.croppedCanvasOptions);
    full_canvas_context.drawImage(cropped_canvas,
        this.fullCanvas.nativeElement.width / 2 - cropped_canvas.width / 2,
        this.fullCanvas.nativeElement.height / 2 - cropped_canvas.height / 2
    );
    const croppedBinary = this.fullCanvas.nativeElement.toDataURL('image/png');
    console.log(croppedBinary);
    return {
      image: croppedBinary,
      scale: 1,
      centering_left: 0,
      centering_top: 0,
      top: 0,
      left: 0,
    };
  }
}
