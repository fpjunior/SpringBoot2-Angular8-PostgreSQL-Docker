import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';

import { URL_EVENTS } from '../../../../constants/url';
import { Evento } from '../evento-form/model/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends RepositoryService<Evento>{
  constructor(public http: HttpClient) { super(http, URL_EVENTS); }
}
