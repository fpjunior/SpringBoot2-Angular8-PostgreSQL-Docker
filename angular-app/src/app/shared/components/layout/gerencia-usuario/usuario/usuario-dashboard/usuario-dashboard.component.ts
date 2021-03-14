import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumbs/breadcrumbs.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { formatCPF } from 'src/app/shared/helpers/formatString.helper';
import { StorageDBService } from 'src/app/shared/services/storageDB.service';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';

import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../usuario-form/model/usuario-form.model';
import { tableArr } from './model/table.model';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.scss'],
  providers: [DatePipe]
})
export class UsuarioDashboardComponent implements OnInit {

  tableColumns = tableArr;
  allColumns = tableArr;
  tableName = "usuarioTable";

  showModalDelete = false;
  showModalResponse = false
  tableLoading: boolean;
  isErrorResponse: boolean;
  contentResponse: string;
  usuarioResults: Usuario[] = [];
  usuario;
  private id: number;
  rows = 10;
  dataToFillTable

  storageData
  showTable = false;


  page = 0;
  size;
  sort = "";
  totalRecords;
  first = 0;
  filters = "";

  breadcrumbItems: MenuItem[] = [{ label: `Gerência de Usuários` }, { label: `Usuários` }];

  constructor(
    private route: Router,
    private usuarioService: UsuarioService,
    private breadcrumbService: BreadcrumbService,
    private progressBarService: ProgressBarService,
    private storageDBService: StorageDBService,
    private datePipe: DatePipe,


  ) { }

  ngOnInit(): void {

    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }


  saveTableConfig(obj: any): void {
    // this.progressBarService.changeProgressBar(true);
    const ObjToSend = {
      logPrecoVenda: obj.$event,
      rowsPerPage: obj.rowsPerPage
    }

    this.filters = obj.filters;

    this.storageDBService.saveStorage(this.tableName, { logPrecoVenda: ObjToSend }).subscribe(
      () => {
        setTimeout(() => {
          this.getTableConfig();
        }, 500);
        // this.progressBarService.changeProgressBar(false);
      },
      err => {
        this.showModalResponse = true;
        // this.progressBarService.changeProgressBar(false);
        this.contentResponse = tryCatchError(err);
        this.getTableConfig();
      })
  }

  private getTableConfig(): void {
    // this.progressBarService.changeProgressBar(true);
    this.tableLoading = true;
    this.storageDBService.getStorage(this.tableName).subscribe(
      column => {
        const auxColumn: any = column;
        const newCols = [];
        for (let i = 0; i < this.allColumns.length; i++) {
          if (auxColumn.data.logPrecoVenda.logPrecoVenda[i]?.showCol) {
            newCols.push(auxColumn.data.logPrecoVenda.logPrecoVenda[i])
          }
        }

        if (auxColumn.data.logPrecoVenda.rowsPerPage) {
          this.rows = auxColumn.data.logPrecoVenda.rowsPerPage;
          this.size = auxColumn.data.logPrecoVenda.rowsPerPage;
        }

        this.tableColumns = newCols;

        if (this.dataToFillTable) {
          setTimeout(() => { this.generateLog(this.storageData); }, 500);
        }

        this.progressBarService.changeProgressBar(false);
        this.tableLoading = false;
      },
      err => {
        if (err.status == 404) {
          this.saveTableConfig({ $event: this.allColumns, rowsPerPage: 10 });
        } else {
          this.showModalResponse = true;
          this.contentResponse = tryCatchError(err);
          this.progressBarService.changeProgressBar(false);
          this.tableLoading = false;
        }
      })
  }

  onHide() {
    this.showModalResponse = false;
  }

  generateLog = (data) => {
    const dataFim = typeof data.dataFim === 'object' ? this.datePipe.transform(data.dataFim, 'dd/MM/yyyy') : data.dataFim;
    const dataInicio = typeof data.dataInicio === 'object' ? this.datePipe.transform(data.dataInicio, 'dd/MM/yyyy') : data.dataInicio;
    const objToSend = { dataFim, dataInicio };
    this.storageData = objToSend;
    this.getTableData({page: this.page, size: this.rows, sort: this.sort, filters: this.filters})
  }

  getTableData(event){
    //ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'false'. Current value: 'true
    // é devido a essa linha abaixo this.tableLoading = true;
    this.tableLoading = true;
    this.progressBarService.changeProgressBar(true);
    this.usuarioService.listAll().subscribe(
      res => {
        if (res === null || res.length < 1) {
          this.contentResponse = "Nenhum dado encontrado nesse período";

          this.showTable = true;
          this.progressBarService.changeProgressBar(false);
          this.tableLoading = false;
          return;
        }
        this.dataToFillTable = res;
        this.showTable = true;
        this.totalRecords = res; //totalPages
        // this.first = res.number === 1 ? 1 : event.page;
        this.progressBarService.changeProgressBar(false);
        this.tableLoading = false;
      },
      err => {
        this.contentResponse = tryCatchError(err);
        this.isErrorResponse = true;
        this.showModalResponse = true;
        this.progressBarService.changeProgressBar(false);
        this.showTable = false;
        this.tableLoading = false;
      }
    )
  }

}
