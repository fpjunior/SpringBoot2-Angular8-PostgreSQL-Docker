import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * showModal: boolean;
 * content: string;
 * header: string;
 * labelConfirm?: string;
 * labelCancel?: string;
 * standard?: boolean;
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  @Input() showModal: boolean;
  @Input() content: string = '';
  @Input() header: string;
  @Output() confirmEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  @Input() labelConfirm?: string = 'Sim';
  @Input() labelCancel?: string = 'Não';
  @Input() standard?: boolean = true;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  onCloseParent = (): void => this.onClose.emit(this.showModal);
  onShowParent = (): void => this.onShow.emit(this.showModal);

}
