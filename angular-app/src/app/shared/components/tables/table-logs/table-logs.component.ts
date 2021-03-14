import { exportPDF, exportXLSX } from 'src/app/shared/utils/exports.util';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatPercent } from 'src/app/shared/helpers/formatString.helper';
import { TableStandard } from 'src/app/shared/models/table.model';

@Component({
  selector: 'app-table-logs',
  templateUrl: './table-logs.component.html',
  styleUrls: ['./table-logs.component.scss'],
})
export class TableLogsComponent implements OnInit, OnChanges {

  logForm: FormGroup = this.formBuilder.group({
    dataFim: [{ value: '', disabled: true }, [Validators.required]],
    dataInicio: [{ value: '', disabled: false }, [Validators.required]]
  });

  maxDate = new Date();
  minDataFim
  disableDataFim

  @Input() cols: TableStandard[];
  @Input() page: string;
  @Input() fullCols: TableStandard[];
  @Input() immutableCols: string[];
  @Input() rowsToShow: number;
  @Input() showTable: boolean = false;
  @Input() loading;

  @Input() dataToFillTable: any[] = [];


  @Output() lazyTableData = new EventEmitter();
  @Output() updateColumn = new EventEmitter();
  @Output() getData = new EventEmitter();

  // @ViewChild('tableGerencia') tabelaHtml: Table;

  numberDataPerPage;
  @Input() totalRecords;
  @Input() first = 0;
  dataKey: any;
  isLazyTable = true;
  showModalColumn = false;
  // tableName = "logPrecoVendaTable";
  isErrorResponse = false;
  showModalDelete = false;
  showModalResponse = false;
  contentResponse = "";
  exit = false;
  wrongDate = false;
  filtersForUrl = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (this.numberDataPerPage < 10 || !this.numberDataPerPage) {
      // this.numberDataPerPage = 10;
    }

    // this.getTableConfig();
  }

  ngOnChanges() {
    this.numberDataPerPage = this.rowsToShow;
  }

  onHideWrongDate() {
    this.wrongDate = false;
  }

  @ViewChild('calendarInput') calendarInput;

  onKeyDate(event: any) {
    if (event.target.value.match(/^\d{2}$/) !== null) {
      event.target.value = event.target.value.replace(/^(\d{2})/, '$1/');
    } else if (event.target.value.match(/^\d{2}\/\d{2}$/) !== null) {
      event.target.value = event.target.value.replace(/^(\d{2})\/(\d{2})$/, '$1/$2/');
    } else if (event.target.value.length > 10) {
      event.target.value = event.target.value.slice(0, 10);
    }

    if (event.target.value.length === 10) {
      this.calendarInput.overlayVisible = false;
      this.daysCheck();
    }
  }

  daysCheck() {
    if (this.logForm.controls.dataInicio.value) {
      this.logForm.controls.dataFim.enable();
    } else {
      this.logForm.controls.dataFim.setValue(null);
      this.logForm.controls.dataFim.disable();
    }

    if (this.logForm.controls.dataFim.value) {
      const inicio = new Date(this.logForm.controls.dataInicio.value);
      const fim = new Date(this.logForm.controls.dataFim.value);
      let limitMore = new Date(inicio);
      let limitLess = new Date(fim);
      limitMore.setDate(inicio.getDate() + 31);
      limitLess.setDate(fim.getDate() - 31);

      if (inicio > fim) {
        this.logForm.controls.dataFim.setValue(null);
      }

      if (fim > limitMore || inicio < limitLess) {
        this.logForm.controls.dataFim.setValue(null);
        this.wrongDate = true;
      }
    }
  }

  sort(e) {
  }

  generateLog = () => {
    this.getData.emit(this.logForm.getRawValue());
  }

  // tudo da tabela abaixo...

  showModalSelectCols = (): boolean => this.showModalColumn = true;

  onHideDialogTable = (): boolean => this.showModalColumn = false;

  onHide = (): Promise<boolean> => this.exit && this.confirmExit();

  onShow = () => setTimeout(() => { if (!this.isErrorResponse) { this.showModalResponse = false; } }, 1500);

  confirmExit = (): Promise<boolean> => this.route.navigate(['/home']);

  exportPdf = (): void => exportPDF(this.cols, this.dataToFillTable, this.page);

  exportExcel = (): void => exportXLSX(this.dataToFillTable, this.page);

  ajustPercent = (value): string => formatPercent(value);

  loadLazyTable(event: any): void {
    let sort;
    if (event.sortField !== undefined) {
      sort = event.sortOrder === 1 ? `${event.sortField},ASC` : `${event.sortField},DESC`
    } else {
      sort = ''
    }

    let filters = "";
    Object.keys(event.filters).map(function (key, index) {
      if (event.filters[key][0].value !== null) {
        filters = filters + `${key}=${event.filters[key][0].value}&`
      }
    });

    this.filtersForUrl = filters;

    this.lazyTableData.emit({ page: event.first / this.rowsToShow, size: this.rowsToShow, sort: sort, filters: this.filtersForUrl })
  }

  colReorderEvent = (e): void => {
    this.updateColumn.emit({ $event: e.columns, rowsPerPage: this.numberDataPerPage });
  }

  changeRows(page: any) {
    this.numberDataPerPage = page.rows;
    this.rowsToShow = page.rows;
    if (page.first == 0) {
      this.updateColumn.emit({ $event: this.cols, rowsPerPage: this.numberDataPerPage, filters: this.filtersForUrl });
    }
  }
}
