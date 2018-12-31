import { Component } from '@angular/core';

@Component({
  selector: 'one',
  template: `
    <h3>
      Component ONE works
      <button mat-raised-button type="button" [matTooltip]="'I am a button from extension'">
        <mat-icon>extension</mat-icon> Mouse over for tooltip
      </button>
    </h3>
  `,
})
export class OneComponent {}
