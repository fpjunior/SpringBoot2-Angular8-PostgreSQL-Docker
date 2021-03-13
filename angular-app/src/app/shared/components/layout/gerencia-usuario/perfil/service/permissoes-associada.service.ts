import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, timeout } from 'rxjs/operators';
import { URL_PROFILE_ASSOCIATES, USER_ASSOCIATES } from 'src/app/shared/constants/url';
import { ApiResponseWrapper } from 'src/app/shared/models/response-api-wrapper.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';

import { AssociacaoPerfil, AssociarPerfil } from '../perfil-form/model/perfil.model';


@Injectable({
  providedIn: 'root'
})
export class PermissoesAssociadaService extends RepositoryService<AssociarPerfil>  {
  constructor(public http: HttpClient) { super(http, URL_PROFILE_ASSOCIATES); }

  getAssociacaoUsuario(id: number): Observable<AssociacaoPerfil[]> {
    return this.http.get<ApiResponseWrapper<AssociacaoPerfil[]>>(`${USER_ASSOCIATES}/${id}`)
      .pipe(map((responseApi) => responseApi.data), timeout(20000), take(1));
  }

  saveAssociacaoUsuario(obj: AssociacaoPerfil): Observable<AssociacaoPerfil> {
    return this.http
      .post<AssociacaoPerfil>(`${USER_ASSOCIATES}/${obj.usuario.codigo}`, obj)
      .pipe(timeout(20000), take(1));
  }

  updatePerfil(obj: AssociarPerfil): Observable<AssociarPerfil> {
    return this.http
      .post<AssociarPerfil>(`${URL_PROFILE_ASSOCIATES}/${obj.perfil.codigo}`, obj)
      .pipe(timeout(20000), take(1));
  }
}
