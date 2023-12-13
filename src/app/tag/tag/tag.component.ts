import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() tagText = '';
  @Input() allowDelete = false; 
  @Output() deleteTag: EventEmitter<void> = new EventEmitter<void>();
}
