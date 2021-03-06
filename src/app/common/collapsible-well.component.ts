import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  template: `
    <div (click)="toggleContent()" class="well pointable">
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content select="[well-body]" *ngIf="visible"></ng-content>
    </div>
  `,
  styles: [
    `
      .well {
        background-color: #262634;
        padding: 0 20px;
      }

      .well:hover {
        background-color: #485563;
        cursor: pointer;
      }
    `,
  ],
})
export class CollapsibleWellComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
