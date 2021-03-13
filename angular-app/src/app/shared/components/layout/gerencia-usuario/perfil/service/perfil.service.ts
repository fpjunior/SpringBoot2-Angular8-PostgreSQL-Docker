import { URL_PROFILE } from 'src/app/shared/constants/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, timeout } from 'rxjs/operators';
import { ApiResponseWrapper } from 'src/app/shared/models/response-api-wrapper.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Perfil } from 'src/app/core/model/perfil.model';

@Injectable({
  providedIn: 'root',
})
export class PerfilService extends RepositoryService<Perfil> {
  constructor(public http: HttpClient) {
    super(http, URL_PROFILE);
  }

  getPerfil(): Observable<Perfil[]> {
    return this.http.get<ApiResponseWrapper<Perfil[]>>(URL_PROFILE)
      .pipe(map((responseApi) => responseApi.data), timeout(20000), take(1));
  }

  disablePerfil = (id: number): Observable<Perfil> =>
    this.http
      .post<Perfil>(`${URL_PROFILE}/desabilitar?codigo=${id}`, id)
      .pipe(timeout(20000), take(1));
}
