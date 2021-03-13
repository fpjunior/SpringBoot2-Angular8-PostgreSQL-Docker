import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'eventos',
    loadChildren: () =>
      import('./modules/eventos/eventos.module').then((m) => m.EventosModule),
  },
  {
    path: 'example',
    loadChildren: () =>
      import('./modules/example/example.module').then(
        (m) => m.ExampleModule
      ),
  },
  {
    path: 'ciclo',
    loadChildren: () =>
      import('./modules/motor-servico/motor-servico.module').then(
        (m) => m.MotorServicoModule
      ),
  },
  {
    path: 'example2',
    loadChildren: () =>
      import('./modules/example2/example2.module').then(
        (m) => m.Example2Module
      ),
  },
  {
    path: 'output-property',
    loadChildren: () =>
      import('./modules/output-property/output-property.module').then(
        (m) => m.OutputPropertyModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (m) => m.HomeModule
      ),
  },

  { path: 'gerencia-usuario',
  loadChildren: () =>
  import('./modules/gerencia-usuario/gerencia-usuario.module').then(
    (m) => m.GerenciaUsuarioModule
  ),
  },

  { path: 'input-property',
  loadChildren: () =>
  import('./modules/input-property/input-property.module').then(
    (m) => m.InputPropertyModule
  ),
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



