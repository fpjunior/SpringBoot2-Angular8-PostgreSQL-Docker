import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, timeout } from 'rxjs/operators';
import { URL_USER } from 'src/app/shared/constants/url';
import { RepositoryService } from 'src/app/shared/services/repository.service';

import { Usuario } from '../usuario-form/model/usuario-form.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends RepositoryService<Usuario>{
  constructor(public http: HttpClient) { super(http, URL_USER); }
}
