import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigIndicador } from '../model/config-indicador.model';
import { ApiResponseWrapper } from 'src/app/shared/models/response-api-wrapper.model';
import { timeout, map } from 'rxjs/operators';
import { URL_CICLO, URL_RESTORE_CONFIG_CICLO, URL_SAVE_CICLO } from 'src/app/shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class ConfigIndicadorService {

  private codigoIndicadorDivergenciaPreco = 1;

  constructor(public http: HttpClient) { }

  getConfigIndicador(): Observable<ConfigIndicador> {
    return this.http.get<ApiResponseWrapper<ConfigIndicador>>(`${URL_CICLO}/${this.codigoIndicadorDivergenciaPreco}/indicador`)
      .pipe(timeout(2000), map(responseApi => responseApi.data))
  }

  getRestoreConfigIndicador(): Observable<ConfigIndicador> {
    return this.http
      .get<ApiResponseWrapper<ConfigIndicador>>(`${URL_RESTORE_CONFIG_CICLO}/${this.codigoIndicadorDivergenciaPreco}/indicador`)
      .pipe(timeout(2000), map(responseApi => responseApi.data))
  }

  saveConfigIndicador(ConfigIndicador: ConfigIndicador){
    return this.http.post(URL_SAVE_CICLO, ConfigIndicador)
  }
}
