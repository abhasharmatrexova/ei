import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FerryServicesRoutingModule } from './ferry-services-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    FerryServicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FerryServicesModule { }
