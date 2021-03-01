import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoDashboardComponent } from './../../shared/components/layout/gerencia-eventos/evento-dashboard/evento-dashboard.component';
import { EventoFormComponent } from './../../shared/components/layout/gerencia-eventos/evento-form/evento-form.component';
import { EventosComponent } from './eventos/eventos.component';

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
