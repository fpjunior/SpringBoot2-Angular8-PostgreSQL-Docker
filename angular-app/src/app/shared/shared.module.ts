import { GenericResponseDialogComponent } from './components/dialogs/generic-response-dialog/generic-response-dialog.component';
import { InputPropertyDashboardComponent } from './components/layout/input-property/input-property-dashboard/input-property-dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableDashboardComponent } from './components/tables/table-dashboard/table-dashboard.component';
import { TableGerenciaComponent } from './components/tables/table-gerencia/table-gerencia.component';
import { ExampleDirective } from './directives/example.directive';
import { PrimengModule } from './modules/primeng.module';
import { ExamplePipe } from './pipes/example.pipe';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { CardServicoAbertoComponent } from './components/widgets/card-servico-aberto/card-servico-aberto.component';
import { CardVariacaoPrecoComponent } from './components/widgets/card-variacao-preco/card-variacao-preco.component';
import { ExampleDashboardComponent } from './components/layout/example/example-dashboard/example-dashboard.component';
import { ExampleFormComponent } from './components/layout/example/example-form/example-form.component';
import {ButtonModule} from 'primeng/button';
import { EventoFormComponent } from './components/layout/gerencia-eventos/evento-form/evento-form.component';
import { OutputPropertyDashboardComponent } from './components/layout/output-property/output-property-dashboard/output-property-dashboard.component';
import { Example2FormComponent } from './components/example2/example2-form/example2-form.component';
import { StepsComponent } from './components/steps/steps.component';
import { InputPropertyFormComponent } from './components/layout/input-property/input-property-form/input-property-form.component';
import { PicklistComponent } from './components/fields/picklist/picklist.component';
import { DialogPicklistComponent } from './components/dialogs/dialog-picklist/dialog-picklist.component';
import { GenericButtonsComponent } from './components/buttons/generic-buttons/generic-buttons.component';
import { InputTextComponent } from './components/fields/input-text/input-text.component';
import { EventoDashboardComponent } from './components/layout/gerencia-eventos/evento-dashboard/evento-dashboard.component';
import { CicloDashboardComponent } from './components/layout/motor-servico/ciclo-dashboard/ciclo-dashboard.component';
import { ConfigIndicadorComponent } from './components/layout/motor-servico/config-indicador/config-indicador.component';
import { UsuarioDashboardComponent } from './components/layout/gerencia-usuario/usuario/usuario-dashboard/usuario-dashboard.component';
import { TableLogsComponent } from './components/tables/table-logs/table-logs.component';
import { DialogTableColumnComponent } from './components/dialogs/dialog-table-column/dialog-table-column.component';
import { InputNumberComponent } from './components/fields/input-number/input-number.component';
import { InputMaskComponent } from './components/fields/input-mask/input-mask.component';
import { UsuarioFormComponent } from './components/layout/gerencia-usuario/usuario/usuario-form/usuario-form.component';


@NgModule({
  declarations: [
    ExamplePipe,
    HeaderComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    ExampleDirective,
    ProgressBarComponent,
    ExampleDashboardComponent,
    ExampleFormComponent,
    Example2FormComponent,
    InputPropertyDashboardComponent,
    InputPropertyFormComponent,
    UsuarioDashboardComponent,
    UsuarioFormComponent,
    TableLogsComponent,
    
    // CORE
    StepsComponent,

    OutputPropertyDashboardComponent,
    EventoDashboardComponent,
    EventoFormComponent,
    CicloDashboardComponent,
    ConfigIndicadorComponent,
    

    // DIALOGS
    ConfirmDialogComponent,
    DialogPicklistComponent,
    GenericResponseDialogComponent,
    DialogTableColumnComponent,

    // CARDS
    CardServicoAbertoComponent,
    CardVariacaoPrecoComponent,

    // TABLES
    TableDashboardComponent,
    TableGerenciaComponent,

    //FIELDS
    PicklistComponent,
    InputTextComponent,
    InputNumberComponent,
    InputNumberComponent,
    InputMaskComponent,


    // BUTTONS
    GenericButtonsComponent,

  ],

  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    
  ],
  exports: [
    PrimengModule,
    HeaderComponent,
    SpinnerComponent,
    FormsModule,
    BreadcrumbsComponent,
    ProgressBarComponent,
    OutputPropertyDashboardComponent,
    CicloDashboardComponent, 
    ConfigIndicadorComponent, 
    PicklistComponent,
    
    // CORE
    StepsComponent,

    // DIALOGS
    ConfirmDialogComponent,
    GenericResponseDialogComponent,

    // CARDS
    CardServicoAbertoComponent,
    CardVariacaoPrecoComponent,
    // TABLES
    TableDashboardComponent,
    TableGerenciaComponent,

    // BUTTONS
    GenericButtonsComponent,

    // FIELDS
    InputTextComponent,
    InputNumberComponent,


  ],
  entryComponents: [

  ], providers: [
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
