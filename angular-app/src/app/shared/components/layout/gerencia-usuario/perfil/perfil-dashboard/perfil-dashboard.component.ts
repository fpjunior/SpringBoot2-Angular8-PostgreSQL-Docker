import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumbs/breadcrumbs.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';

import { PerfilService } from '../service/perfil.service';
import { StorageDBService } from '../../../../../services/storageDB.service';
import { tableArr } from './model/table.model';


@Component({
  selector: 'app-perfil-dashboard',
  templateUrl: './perfil-dashboard.component.html',
  styleUrls: ['./perfil-dashboard.component.scss']
})
export class PerfilDashboardComponent implements OnInit {

  showModalDelete = false;
  tableLoading: boolean;
  showModalResponse: boolean;
  tableName = "perfilTable";

  contentResponse: string;

  perfil;

  private id: number;
  rows = 10;

  tableColumns = tableArr;
  allColumns = tableArr;
  // perfilResults: Perfil[] = [];
  breadcrumbItems: MenuItem[] = [{ label: `Gerência de Usuários` }, { label: `Perfil` }];

  constructor(
    private route: Router,
    private perfilService: PerfilService,
    private breadcrumbService: BreadcrumbService,
    private storageDBService: StorageDBService,
    // private progressBarService: ProgressBarService
  ) { }

  ngOnInit(): void {
    this.getTableConfig();
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }

  newRegister = (): Promise<boolean> => this.route.navigate(['/home/perfil/cadastrar']);

  onHide = (): boolean => this.showModalResponse = false;
  onShow = (): boolean => this.showModalResponse = true;

  getPerfil() {
    // this.progressBarService.changeProgressBar(true);
    this.tableLoading = true;
    this.perfilService.listAll().subscribe(
      perfils => {
        const auxPerfil = perfils;
        // this.perfilResults = auxPerfil;
        this.tableLoading = false;
        // this.progressBarService.changeProgressBar(false);
      },
      err => {
        this.showModalResponse = true;
        this.contentResponse = tryCatchError(err);
        this.tableLoading = false;
        // this.progressBarService.changeProgressBar(false);
      })
  }

  private getTableConfig(): void {
    this.tableLoading = true;
    this.storageDBService.getStorage(this.tableName).subscribe(
      column => {
        const auxColumn: any = column;
        // Caso dê alguma bronca no banco 
        if (typeof auxColumn.data.perfilTable.perfilTable == "boolean" || !auxColumn.data.perfilTable.perfilTable) {
          this.showModalResponse = true;
          this.tableLoading = false;
          this.contentResponse = "Ocorreu um erro ao recuperar os dados da tabela, aguarde!";
          this.deleteTableConfig();
          return this.saveTableConfig({ $event: this.allColumns, rowsPerPage: 10 })
        }

        const newCols = [];
        for (let i = 0; i < this.tableColumns.length; i++) {
          if (auxColumn.data.perfilTable.perfilTable[i].showCol) {
            newCols.push(auxColumn.data.perfilTable.perfilTable[i])
          }
        }

        if (auxColumn.data.perfilTable.rowsPerPage) {
          this.rows = auxColumn.data.perfilTable.rowsPerPage;
        }

        this.tableColumns = newCols;
        this.getPerfil();
        this.tableLoading = false;
      },
      err => {
        if (err.status == 404) {
          this.saveTableConfig({ $event: this.allColumns, rowsPerPage: 10 });
        } else {
          this.showModalResponse = true;
          this.contentResponse = tryCatchError(err);
        }
        this.tableLoading = false;

      })
  }

  saveTableConfig(obj: any): void {
    this.tableLoading = true;
    const ObjToSend = {
      perfilTable: obj.$event,
      rowsPerPage: obj.rowsPerPage
    }
    this.storageDBService.saveStorage(this.tableName, { "perfilTable": ObjToSend }).subscribe(
      () => { setTimeout(() => { this.getTableConfig(); }, 500); },
      err => {
        this.showModalResponse = true;
        this.tableLoading = false;
        this.contentResponse = tryCatchError(err);
      })
  }


  deletePerfil(id: number): void {
    this.id = id;
    this.showModalDelete = true;
  }

  confirmDeletePerfil(): void {
    this.perfilService.disablePerfil(this.id).subscribe(
      () => {
        this.getPerfil();
        this.showModalDelete = false;
      },
      err => {
        this.showModalResponse = true;
        this.contentResponse = tryCatchError(err);
        this.showModalDelete = false;

      })
  }

  private deleteTableConfig(): void {
    this.tableLoading = true;
    this.storageDBService.deleteStorage(this.tableName).subscribe(
      () => { this.tableLoading = false; },
      err => {
        this.showModalResponse = true;
        this.tableLoading = false;
        this.contentResponse = tryCatchError(err);
        this.getTableConfig();
      })
  }
}
