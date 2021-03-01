import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos/eventos.component';



@NgModule({
  declarations: [EventosComponent],
  imports: [
    CommonModule,
    SharedModule,
    EventosRoutingModule,
  ]
})
export class EventosModule { }
