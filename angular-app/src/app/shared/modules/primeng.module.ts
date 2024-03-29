import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  exports: [
    PaginatorModule,
    CardModule,
    MenubarModule,
    SidebarModule,
    SplitButtonModule,
    PanelMenuModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    PickListModule,
    BreadcrumbModule,
    DialogModule,
    ChartModule,
    CheckboxModule,
    InputTextModule,
    TooltipModule,
    StepsModule,
    InputMaskModule,
    CalendarModule,

    // MessagesModule,
    // MessageModule
    // DialogModule
    // ToastModule,
    RippleModule,
  ]
})
export class PrimengModule { }
