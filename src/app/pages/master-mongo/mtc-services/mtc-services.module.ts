import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtcServicesRoutingModule } from './mtc-services-routing.module';
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
    MtcServicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MtcServicesModule { }
