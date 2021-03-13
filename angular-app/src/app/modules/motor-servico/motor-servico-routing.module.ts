import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigIndicadorComponent } from 'src/app/shared/components/layout/motor-servico/config-indicador/config-indicador.component';
import { MotorServicoComponent } from './motor-servico/motor-servico.component';

const routes: Routes = [
  {
    path: '',
    component: MotorServicoComponent,
    children: [
      { path: '', redirectTo: 'config-indicador/cadastrar' },
      { path: 'config-indicador/cadastrar', component: ConfigIndicadorComponent },
      { path: 'config-indicador/editar/:id', component: ConfigIndicadorComponent },
      { path: '**', redirectTo: 'config-indicador/cadastrar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotorServicoRoutingModule { }
