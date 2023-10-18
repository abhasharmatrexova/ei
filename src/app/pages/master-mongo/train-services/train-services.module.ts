import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainServicesRoutingModule } from './train-services-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TrainServicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TrainServicesModule { }
