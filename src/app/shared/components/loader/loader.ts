import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinner],
  template: `<mat-progress-spinner mode="indeterminate" diameter="40" />`,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      padding: 24px 0;
    }
  `,
})
export class Loader {}
