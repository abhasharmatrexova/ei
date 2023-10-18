import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RstTypesRoutingModule } from './rst-types-routing.module';
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
    RstTypesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RstTypesModule { }
