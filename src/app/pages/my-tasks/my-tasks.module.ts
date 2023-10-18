import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

//model 
import { MyTasksRoutingModule } from './my-tasks-routing.module';

// component
import { MyTasksListComponent } from './my-tasks-list/my-tasks-list.component';
import { MyTasksAddComponent } from './my-tasks-add/my-tasks-add.component';



@NgModule({
  declarations: [
    MyTasksListComponent,
    MyTasksAddComponent,
  ],
  imports: [
    CommonModule,
    MyTasksRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    BsDatepickerModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MyTasksModule {

 }
