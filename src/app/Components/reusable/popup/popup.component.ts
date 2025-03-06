import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() isOpen: boolean = false;  // Control visibility from the parent
  @Output() close = new EventEmitter<void>(); // Event to notify parent on close

  closePopup() {
    this.close.emit(); // Emit event when closing the popup
  }
}
