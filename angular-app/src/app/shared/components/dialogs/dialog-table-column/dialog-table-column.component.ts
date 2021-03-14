import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableStandard } from 'src/app/shared/models/table.model';

/**
 * fullCols: TableStandard[];
 * colsModified: TableStandard[];
 * immutables: string[];
 * showModal: boolean;
 */
@Component({
  selector: 'app-dialog-table-column',
  templateUrl: './dialog-table-column.component.html',
  styleUrls: ['./dialog-table-column.component.scss']
})
export class DialogTableColumnComponent implements OnInit {

  disableCheckAll = true;
  checkPointCols: any[];

  @Input() fullCols: TableStandard[];
  @Input() colsModified: TableStandard[];

  @Input() immutables: string[];
  @Input() showModal: boolean;

  @Output() exportExcel = new EventEmitter();
  @Output() exportPdf = new EventEmitter();
  @Output() saveColumn = new EventEmitter();

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => { this.checkChecks(this.fullCols) }, 500);
  }

  onCloseParent = (): void => this.onClose.emit(this.showModal);

  onShowParent = (): void => {
    this.onShow.emit(this.showModal);
    setTimeout(() => { this.checkChecks(this.fullCols) }, 50);
  }

  returnColumns = (): void => {
    for (let j = 0; j < this.fullCols.length; j++) {
      this.fullCols[j].showCol = true;
    }
    this.saveColumn.emit(this.fullCols);
    this.onCloseParent();
  }

  arrayToSend(): TableStandard[] {
    const modifiedArr = this.colsModified;
    const checksArr: any = this.fullCols;
    let auxArr = modifiedArr.map(e => e.field);

    if (modifiedArr.length < checksArr.length) {
      for (let i = 0; i < checksArr.length; i++) {
        if (auxArr.indexOf(checksArr[i].field) === -1) {
          modifiedArr.push(checksArr[i]);
        }
      }
    }

    for (let i = 0; i < modifiedArr.length; i++) {
      for (let j = 0; j < checksArr.length; j++) {
        if (modifiedArr[i].field == checksArr[j].field) {
          modifiedArr[i].showCol = checksArr[j].showCol;
        }
      }
    }

    return modifiedArr;
  }

  checkDisable(isChecked: boolean): void {
    if (!isChecked) {
      this.disableCheckAll = false;
    } else if (this.fullCols.every(this.checkIsTrue)) {
      this.disableCheckAll = true;
    }
  }

  checkAllColumns = (): void => {
    if (this.fullCols.every(this.checkIsTrue)) {
      this.disableCheckAll = true;
    } else {
      this.fullCols.forEach(this.checkToTrue);
      this.disableCheckAll = true;
    }
  }

  disableOneCheck(col, index: number): boolean {
    let boolReturn: boolean
    if (this.immutables && this.immutables.length > 0) {
      for (let i = 0; i < this.immutables.length; i++) {
        if (this.immutables[i] == col.field) {
          boolReturn = true;
          break;
        }
        boolReturn = false;
      }
    }
    return boolReturn;
  }

  private checkIsTrue = (value): boolean => value.showCol == true;

  private checkToTrue = (value): void => { if (value.showCol == false) { value.showCol = true } };

  private checkChecks = (value): void => {
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < this.colsModified.length; j++) {
        if (this.fullCols[i].field == this.colsModified[j].field) {
          value[i].showCol = true;
          break;
        } else {
          value[i].showCol = false;
        }
      }
    }

    if (!this.fullCols.every(this.checkIsTrue)) {
      this.disableCheckAll = false;
    }
  }
}
