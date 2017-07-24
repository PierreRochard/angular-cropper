import {Component, ViewChild} from '@angular/core';
import {CropperContainer} from './cropper/cropper.container';


@Component({
  selector: 'app-root',
  template: `
    <p-dialog
      [(visible)]="is_modal_open"
      [modal]="true"
      [resizable]="false"
      [closable]="true"
      [draggable]="false"
      [minWidth]="800"
      [minHeight]="600"
      [width]="800"
      [height]="'auto'"
    >
      <app-cropper-container
      *ngIf="is_modal_open"
      ></app-cropper-container>
    </p-dialog>
    <button type="text"
            (click)="showDialog()"
            pButton
            icon="fa-external-link-square"
            label="Show">
    </button>
  `,
})
export class AppComponent {
  public is_modal_open: boolean = false;

  @ViewChild(CropperContainer)
  public cropperContainer: CropperContainer;



  showDialog() {
    this.is_modal_open = true;
  }
}
