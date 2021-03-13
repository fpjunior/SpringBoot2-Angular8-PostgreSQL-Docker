import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MotorServicoRoutingModule } from './motor-servico-routing.module';
import { MotorServicoComponent } from './motor-servico/motor-servico.component';


@NgModule({
  declarations: [MotorServicoComponent],
  imports: [
    CommonModule,
    SharedModule,
    MotorServicoRoutingModule,
  ]
})
export class MotorServicoModule { }
