import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-cropper-controls-component',
  template: `
      <button pButton type="button" (click)="onRemove.emit()"
              label="Remove"></button>
      <button pButton type="button" (click)="onSave.emit()"
              label="Save"></button>
  `,
})
export class CropperControlsComponent {

  @Output() onSave = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();

}
