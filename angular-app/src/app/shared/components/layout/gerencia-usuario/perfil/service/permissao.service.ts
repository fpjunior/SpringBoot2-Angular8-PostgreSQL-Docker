import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, timeout } from 'rxjs/operators';
import { UserPermission } from 'src/app/model/user-permission.model';
import { URL_PERMIT } from 'src/app/shared/constants/url';
import { ApiResponseWrapper } from 'src/app/shared/models/response-api-wrapper.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends RepositoryService<UserPermission[]>  {
  constructor(public http: HttpClient) { super(http, URL_PERMIT); }

  getPermissoes(): Observable<UserPermission[]> {
    return this.http.get<ApiResponseWrapper<UserPermission[]>>(URL_PERMIT)
      .pipe(map((responseApi) => responseApi.data), timeout(20000), take(1));
  }
}
