import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiServicesRoutingModule } from './gui-services-routing.module';
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
    GuiServicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class GuiServicesModule { }
