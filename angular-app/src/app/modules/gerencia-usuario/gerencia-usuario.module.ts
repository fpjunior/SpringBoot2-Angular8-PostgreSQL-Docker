import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GerenciaUsuarioRoutingModule } from './gerencia-usuario-routing.module';
import { GerenciaUsuarioComponent } from './gerencia-usuario/gerencia-usuario.component';

@NgModule({
  declarations: [GerenciaUsuarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    GerenciaUsuarioRoutingModule,
  ]
})
export class GerenciaUsuarioModule { }
