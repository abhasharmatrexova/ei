import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListComponent } from './contracts-list/contracts-list.component';
import { ContractsAddComponent } from './contracts-add/contracts-add.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    ContractsListComponent,
    ContractsAddComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AccordionModule,
    NgxDropzoneModule
  ]
})
export class ContractsModule { }
