import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cropper-zoom-component',
  template: `
    {{zoomValue() }} %
    <p-slider
      [ngModel]="zoom_slider_value * 100"
      [min]="zoom_slider_min"
      [max]="zoom_slider_max"
      [orientation]="orientation"
      [step]="zoom_slider_step"
      (onChange)="cropperZoom($event)"
    ></p-slider>
  `,
})
export class CropperZoomComponent {
  public zoom_slider_min: number = 10;
  public zoom_slider_max: number = 200;
  public zoom_slider_step: number = 5;
  public orientation: string = 'vertical';

  @Input() zoom_slider_value: number;
  @Output() onZoom = new EventEmitter<number>();

  cropperZoom(event) {
    this.onZoom.emit(parseFloat(event.value.toFixed(2)) / 100);
  }

  zoomValue() {
    return Math.round(this.zoom_slider_value * 100);
  }
}
