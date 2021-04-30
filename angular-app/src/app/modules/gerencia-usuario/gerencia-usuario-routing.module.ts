import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciaUsuarioComponent } from './gerencia-usuario/gerencia-usuario.component';
import { UsuarioFormComponent } from 'src/app/shared/components/layout/gerencia-usuario/usuario/usuario-form/usuario-form.component';
import { UsuarioDashboardComponent } from 'src/app/shared/components/layout/gerencia-usuario/usuario/usuario-dashboard/usuario-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: GerenciaUsuarioComponent,
    children: [
      { path: 'usuario/dashboard', component: UsuarioDashboardComponent },
      { path: 'usuario/cadastrar', component: UsuarioFormComponent },
      { path: 'usuario/editar/:id', component: UsuarioFormComponent },
      { path: '**', redirectTo: 'usuario/dashboard' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciaUsuarioRoutingModule { }
