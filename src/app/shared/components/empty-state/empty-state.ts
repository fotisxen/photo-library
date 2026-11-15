import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  imports: [MatIcon],
  template: `
    <mat-icon>{{ icon() }}</mat-icon>
    <h2>{{ title() }}</h2>
    <ng-content />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 64px 16px;
      text-align: center;
    }
    mat-icon {
      width: 56px;
      height: 56px;
      font-size: 56px;
      color: var(--mat-sys-primary);
    }
    h2 {
      margin: 0;
      font: var(--mat-sys-title-large);
    }
  `,
})
export class EmptyState {
  icon = input.required<string>();
  title = input.required<string>();
}
