import { tiposArr } from './../../gerencia-eventos/evento-form/model/dropdowns.model';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StorageDBService } from 'src/app/shared/services/storageDB.service';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';
import { BreadcrumbService } from '../../../breadcrumbs/breadcrumbs.service';
import { Evento } from '../../gerencia-eventos/evento-form/model/evento.model';
import { EventoService } from '../../gerencia-eventos/service/evento.service';
import { tableArr } from './model/table.model';
import { formaterSorN } from 'src/app/shared/utils/tables.util';

@Component({
  selector: 'app-evento-dashboard',
  templateUrl: './evento-dashboard.component.html',
  styleUrls: ['./evento-dashboard.component.scss']
})
export class EventoDashboardComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [{ label: `Evento Dashboard` }];
  tableLoading: boolean;

  showModalDeleteDenied = false;
  showModalResponse: boolean;
  showModalDelete = false;

  tableColumns = tableArr;
  allColumns = tableArr;
  eventoResults: Evento[] = [];
  rows = 10;
  tableName: string = "eventoTable";
  private id: number;
  contentResponse: string;

  evento;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private storageDBService: StorageDBService,
    private eventoService: EventoService,


  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }

  onHide() { this.showModalResponse = false }


  deleteEvento(id: number): void {

  }

  confirmDeleteEvento(): void {

  }

  private getEventos(): void {
    // this.tableLoading = true;
    // this.eventoService.listAll().subscribe(
    //   eventos => {
    //     let auxEventos = eventos;
    //     auxEventos = this.eventsAdapter(auxEventos);
    //   })
  }

  private eventsAdapter(events: Evento[]): Evento[] {
    let newEvent: Evento[] = [];
    events.forEach(event => {
      let { icms, icmsSt, pis, cofins, ipi, impostoImportacao, tipo } = event;
      newEvent.push({
        ...event,
        tipo: tiposArr[tipo - 1].description,
        icms: formaterSorN(icms),
        icmsSt: formaterSorN(icmsSt),
        pis: formaterSorN(pis),
        cofins: formaterSorN(cofins),
        ipi: formaterSorN(ipi),
        impostoImportacao: formaterSorN(impostoImportacao)
      })
    });
    return newEvent;
  }

  private getTableConfig(): void {
    this.tableLoading = true;
    // this.progressBarService.changeProgressBar(true);
    this.storageDBService.getStorage(this.tableName).subscribe(
      column => {
        const auxColumn: any = column;

        // Caso dê alguma bronca no banco 
        if (typeof auxColumn.data.eventoTable.eventoTable == "boolean" || !auxColumn.data.eventoTable.eventoTable) {
          this.showModalResponse = true;
          this.tableLoading = false;
          this.contentResponse = "Ocorreu um erro ao recuperar os dados da tabela, aguarde!";
          this.deleteTableConfig();
          return this.saveTableConfig({ $event: this.allColumns, rowsPerPage: 10 })
        }

        const newCols = [];
        for (let i = 0; i < this.allColumns.length; i++) {
          if (auxColumn.data.eventoTable.eventoTable[i]?.showCol) {
            newCols.push(auxColumn.data.eventoTable.eventoTable[i])
          }
        }

        if (auxColumn.data.eventoTable.rowsPerPage) {
          this.rows = auxColumn.data.eventoTable.rowsPerPage;
        }

        this.tableColumns = newCols;
        this.tableLoading = false;
        setTimeout(() => { this.getEventos(); }, 500);
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
      eventoTable: obj.$event,
      rowsPerPage: obj.rowsPerPage
    };

    this.storageDBService.saveStorage(this.tableName, { eventoTable: ObjToSend }).subscribe(
      () => {
        setTimeout(() => { this.getTableConfig(); }, 500);
      }, err => {
        this.showModalResponse = true;
        this.tableLoading = false;
        this.contentResponse = tryCatchError(err);
        this.getTableConfig();
      })
  }

  private deleteTableConfig(): void{
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
