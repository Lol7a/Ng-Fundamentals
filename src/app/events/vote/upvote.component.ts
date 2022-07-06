import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss'],
})
export class UpvoteComponent {
  // DEFINING INPUT PROPERTIES
  @Input() count: number;
  @Input() voted: boolean;
  @Output() vote = new EventEmitter();

  // METHOD ON VOTING WIDGET
  // WHEN CLICKED IT EMITS VOTING
  onClick() {
    this.vote.emit({});
    this.voted = !this.voted;
  }
}
