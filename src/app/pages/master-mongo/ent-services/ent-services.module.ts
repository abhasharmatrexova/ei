import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntServicesRoutingModule } from './ent-services-routing.module';
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
    EntServicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EntServicesModule { }
