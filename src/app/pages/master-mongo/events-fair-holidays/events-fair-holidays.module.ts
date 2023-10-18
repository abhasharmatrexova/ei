import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsFairHolidaysRoutingModule } from './events-fair-holidays-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    EventsFairHolidaysRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EventsFairHolidaysModule { }
