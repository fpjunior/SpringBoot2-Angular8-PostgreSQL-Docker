import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumbs/breadcrumbs.service';
import { StorageDBService } from 'src/app/shared/services/storageDB.service';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../usuario-form/model/usuario-form.model';

import { tableArr } from './model/table.model';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.scss'],
  providers: [UsuarioService],
})
export class UsuarioDashboardComponent implements OnInit {

  tableColumns = tableArr;
  allColumns = tableArr;
  usuarioResults: Usuario[] = [];

  contentResponse: string;
  showModalDelete = false;
  showModalDeleteDenied = false;
  showModalResponse: boolean;
  tableLoading: boolean;

  tableName = "usuarioTable";
  breadcrumbItems: MenuItem[] = [{ label: `Usuarios` }];

  private id: number;
  rows = 10;

  usuario;

  constructor(
    private route: Router,
    private usuarioService: UsuarioService,
    private breadcrumbService: BreadcrumbService,
    private storageDBService: StorageDBService,
    // private progressBarService: ProgressBarService,
  ) { }

  ngOnInit(): void {
    this.getTableConfig();
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }

  onHide() { this.showModalResponse = false }

  newRegister = (): Promise<boolean> => this.route.navigate(['/gerencia-usuario/usuario/cadastrar']);

  deleteUsuario(id: number): void {
    // this.id = id;
    // this.precoBaseService.verificarExisteUniversoParaUsuario(id).subscribe(
    //   accert => {
    //     const aux: any = accert;
    //     if (aux.data == true) {
    //       this.showModalDeleteDenied = true;
    //     } else {
    //       this.showModalDelete = true;
    //     }
    //   },
    //   err => {
    //     this.showModalResponse = true;
    //     this.contentResponse = tryCatchError(err);
    //     // this.progressBarService.changeProgressBar(false);
    //   }, () => {
    //     // this.progressBarService.changeProgressBar(false);
    //   })
  }

  confirmDeleteUsuario(): void {
    // this.progressBarService.changeProgressBar(true);
    this.usuarioService.deleteById(this.id).subscribe(
      () => {
        this.getUsuarios();
        this.showModalDelete = false;
      },
      err => {
        this.showModalResponse = true;
        this.contentResponse = tryCatchError(err);
        // this.progressBarService.changeProgressBar(false);
      }, () => {
        // this.progressBarService.changeProgressBar(false);
      })
  }

  private getUsuarios(): void {
    // this.progressBarService.changeProgressBar(true);
    this.tableLoading = true;
    this.usuarioService.listAll().subscribe(
      usuarios => {
        let auxUsuarios = usuarios;
        this.usuarioResults = auxUsuarios;
        this.tableLoading = false;
      },
      err => {
        this.showModalResponse = true;
        this.contentResponse = tryCatchError(err);
        this.tableLoading = false;
        // this.progressBarService.changeProgressBar(false);
      },
      // () => this.progressBarService.changeProgressBar(false)
    )
  }

  private getTableConfig(): void {
    this.tableLoading = true;
    // this.progressBarService.changeProgressBar(true);
    this.storageDBService.getStorage(this.tableName).subscribe(
      column => {
        const auxColumn: any = column;

        // Caso dê alguma bronca no banco 
        if (typeof auxColumn.data.usuarioTable.usuarioTable == "boolean" || !auxColumn.data.usuarioTable.usuarioTable) {
          this.showModalResponse = true;
          this.tableLoading = false;
          this.contentResponse = "Ocorreu um erro ao recuperar os dados da tabela, aguarde!";
          this.deleteTableConfig();
          return this.saveTableConfig({ $event: this.allColumns, rowsPerPage: 10 })
        }

        const newCols = [];
        for (let i = 0; i < this.allColumns.length; i++) {
          if (auxColumn.data.usuarioTable.usuarioTable[i]?.showCol) {
            newCols.push(auxColumn.data.usuarioTable.usuarioTable[i])
          }
        }

        if (auxColumn.data.usuarioTable.rowsPerPage) {
          this.rows = auxColumn.data.usuarioTable.rowsPerPage;
        }

        this.tableColumns = newCols;
        this.tableLoading = false;
        setTimeout(() => { this.getUsuarios(); }, 500);
      },
      err => {
        if (err.status == 404) {
          this.saveTableConfig({ $event: this.allColumns, rowsPerPage: 10 });
        } else {
          this.showModalResponse = true;
          this.contentResponse = tryCatchError(err);
          // this.progressBarService.changeProgressBar(false);
          this.tableLoading = false;
        }
      })
  }

  saveTableConfig(obj: any): void {
    this.tableLoading = true;

    const ObjToSend = {
      usuarioTable: obj.$event,
      rowsPerPage: obj.rowsPerPage
    }

    this.storageDBService.saveStorage(this.tableName, { usuarioTable: ObjToSend }).subscribe(
      () => { setTimeout(() => { this.getTableConfig(); }, 500); },
      err => {
        this.showModalResponse = true;
        this.tableLoading = false;
        this.contentResponse = tryCatchError(err);
        this.getTableConfig();
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
