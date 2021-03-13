import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, timeout } from 'rxjs/operators';
import { URL_USER_ORIGIN_ACCESS, URL_USER_UNIT } from 'src/app/shared/constants/url';
import { RepositoryService } from 'src/app/shared/services/repository.service';

import { UnidadeOrigem } from '../usuario-form/model/unidade-origem.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeOrigemService extends RepositoryService<UnidadeOrigem>{
  constructor(public http: HttpClient) { super(http, URL_USER_UNIT); }

  getUnidadeAcesso(codigoERP: number) {
    return this.http.get(`${URL_USER_ORIGIN_ACCESS}/${codigoERP}/unidades-acesso`).pipe(
      timeout(20000),
      take(1));
  }
}


