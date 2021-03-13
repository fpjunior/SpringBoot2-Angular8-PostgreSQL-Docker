import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, timeout } from 'rxjs/operators';
import { URL_USER_ORIGIN } from 'src/app/shared/constants/url';
import { RepositoryService } from 'src/app/shared/services/repository.service';

import { UsuarioOrigem } from '../usuario-form/model/usuario-origem.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioOrigemService extends RepositoryService<UsuarioOrigem>{
  constructor(public http: HttpClient) { super(http, URL_USER_ORIGIN); }

  saveUsuario(obj: UsuarioOrigem): Observable<UsuarioOrigem> {
    return this.http
      .post<UsuarioOrigem>(`${URL_USER_ORIGIN}/salvar`, obj)
      .pipe(timeout(20000), take(1));
  }
}
