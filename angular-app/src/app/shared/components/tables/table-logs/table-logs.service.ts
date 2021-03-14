import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, take, timeout } from 'rxjs/operators';
import { URL_LOGS } from 'src/app/shared/constants/url';
import { ApiResponseWrapper } from 'src/app/shared/models/response-api-wrapper.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Log } from './models/log.model';

@Injectable({
  providedIn: 'root',
})
export class LogsService extends RepositoryService<Log> {
  constructor(public http: HttpClient) {
    super(http, URL_LOGS);
  }

  getPrecosVendaData(datas, page, size, sort, filters): Observable<any> {
    filters == null ? filters = "" : filters = filters;
    return this.http
      .get<ApiResponseWrapper<any>>(
        `${URL_LOGS}/associacao-evento-preco-venda?${filters}dataFim=${datas.dataFim}&dataInicio=${datas.dataInicio}&page=${page}&size=${size}&sort=${sort}`
      )
      .pipe(
        delay(1000),
        timeout(20000),
        map((responseApi) => responseApi.data),
        take(1)
      );
  }

  getPrecosListaData(datas, page, size, sort, filters): Observable<any> {
    filters == null ? filters = "" : filters = filters;
    return this.http
      .get<ApiResponseWrapper<any>>(
        `${URL_LOGS}/associacao-evento-preco-lista?${filters}dataFim=${datas.dataFim}&dataInicio=${datas.dataInicio}&page=${page}&size=${size}&sort=${sort}`
      )
      .pipe(
        delay(1000),
        timeout(20000),
        map((responseApi) => responseApi.data),
        take(1)
      );
  }

  getCustoPartidaData(datas, page, size, sort, filters): Observable<any> {
    filters == null ? filters = "" : filters = filters;
    return this.http
      .get<ApiResponseWrapper<any>>(
        `${URL_LOGS}/tipo-custo-partida?${filters}dataFim=${datas.dataFim}&dataInicio=${datas.dataInicio}&page=${page}&size=${size}&sort=${sort}`
      )
      .pipe(
        delay(1000),
        timeout(20000),
        map((responseApi) => responseApi.data),
        take(1)
      );
  }

}
