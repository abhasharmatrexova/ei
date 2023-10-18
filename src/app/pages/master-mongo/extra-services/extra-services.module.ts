import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraServicesRoutingModule } from './extra-services-routing.module';
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
    ExtraServicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ExtraServicesModule { }
