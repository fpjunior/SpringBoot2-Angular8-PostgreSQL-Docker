import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_EVENTS } from 'src/app/shared/constants/url';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Evento } from '../../gerencia-eventos/evento-form/model/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends RepositoryService<Evento> {

constructor(public http: HttpClient) { super(http, URL_EVENTS) }

}
