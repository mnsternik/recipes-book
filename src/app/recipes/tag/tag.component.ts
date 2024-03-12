import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() tagText: string;
  @Input() isSelected = false; 
  @Input() allowSelect = false; 
  @Input() hide = false;

  onClick() {
    if (this.allowSelect) {
      this.isSelected = !this.isSelected; 
    }
  }

  hideHandler() {
    this.hide = true; 
  }
}
