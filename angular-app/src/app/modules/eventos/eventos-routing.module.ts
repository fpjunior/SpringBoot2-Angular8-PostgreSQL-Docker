import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { EventoFormComponent } from 'src/app/shared/components/layout/gerencia-evento/evento-form/evento-form.component';
import { EventoDashboardComponent } from 'src/app/shared/components/layout/gerencia-evento/evento-dashboard/evento-dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: EventosComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: EventoDashboardComponent },
      { path: 'cadastrar', component: EventoFormComponent },
      { path: 'editar/:id', component: EventoFormComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
