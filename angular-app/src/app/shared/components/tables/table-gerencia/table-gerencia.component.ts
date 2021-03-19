import { ProgressBarService } from './../../progress-bar/progress-bar.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { TableStandard } from 'src/app/shared/models/table.model';
import { exportPDF, exportXLSX } from 'src/app/shared/utils/exports.util';
import { formatPercent } from 'src/app/shared/helpers/formatString.helper';

@Component({
  selector: 'app-table-gerencia',
  templateUrl: './table-gerencia.component.html',
  styleUrls: ['./table-gerencia.component.scss']
})
export class TableGerenciaComponent implements OnInit, AfterViewInit {

  totalRecords: number;
  selectedColumns: any;
  selectColumns = false;
  searchByField = false;
  showModalColumn = false;
  showFilter = false;
  isLazyTable = false;

  numberDataPerPage: number;
  dataKey: any;
  tableName: any;

  @Input() rowsToShow: number;
  @ViewChild('tableGerencia') tabelaHtml: Table;
  /**
   * LOADING
   */
  @Input() loading: boolean;
  /**
    * ARRAY DE COLUNAS
    */
  @Input() cols: TableStandard[];
  @Input() fullCols: TableStandard[];
  @Input() immutableCols: string[];
  /**
    * TELA REFERÊNCIA .:. 5.1 = gerencia-perfil, 5.2 = gerencia-usuario, 6 = gerencia-eventos , 7 = uf-atuacao
    */
  @Input() page: string;

  //  5.1 = gerencia-perfil, 5.2 = gerencia-usuario, 6 = gerencia-eventos , 7 = uf-atuacao

  /**
   * DADOS QUE PREENCHEM A TABELA
   */
  @Input() dataToFillTable: any[];
  /**
   * MODAIS DE DELETAR
   */
  @Input() showModalDelete = false;
  @Input() showModalDeleteDenied = false;
  @Input() mostrarBuscar = true;
  @Output() delete = new EventEmitter();
  @Output() updateColumn = new EventEmitter();
  @Output() closeDelete = new EventEmitter();
  @Output() confirmDelete = new EventEmitter();


  @Input() globalFilterFields?: string[];

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    if (this.numberDataPerPage < 10 || !this.numberDataPerPage) {
      this.numberDataPerPage = 10;
    }
  }

  ajustPercent = (value: number): string => formatPercent(value);

  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.setTableColumnStyle(this.page);
      this.numberDataPerPage = this.rowsToShow;
    }, 500);
  }

  changeRows(page: any) {
    this.numberDataPerPage = page.rows;
    if (page.first == 0) {
      this.updateColumn.emit({ $event: this.cols, rowsPerPage: this.numberDataPerPage });
    }
  }

  exportPdf = (): void => exportPDF(this.cols, this.dataToFillTable, this.page);

  exportExcel = (): void => exportXLSX(this.dataToFillTable, this.page);

  showModalSelectColumns = (): boolean => this.showModalColumn = true;

  onHideDialogConfirmExclude = () => {
    this.closeDelete.emit(false);
    this.showModalDelete = false;
  }

  onHideDialogConfirmExcludeDenied = () => {
    this.closeDelete.emit(false);
    this.showModalDeleteDenied = false;
  }

  colReorderEvent = (e): void => {
    this.updateColumn.emit({ $event: e.columns, rowsPerPage: this.numberDataPerPage });
  }

  onHideDialogTable = (): void => {
    this.showModalColumn = false;
  }

  newRegister = (page: string): Promise<boolean> => {
        return this.route.navigate(['/gerencia-usuario/usuario/cadastrar'])
  };

  editRegister = (page: string): string => {
    switch (page) {
      case 'gerencia-usuarios':
        return '/gerencia-usuario/usuario/cadastrar'
    }
  };

  identify(index, item): any {
    return item.id;
  }

  loadLazyTable(event: LazyLoadEvent): void {
  }

  sort(event) {
    console.log(event.field);
  }

  filter(event) {
    console.log(event.field);
  }
}
