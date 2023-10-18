import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//model 
import { CommonModule } from '@angular/common';
import { RoomTypesRoutingModule } from './room-types-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [
    
    // EntServicesComponent,
    // EventsFairHolidaysComponent,
    ListComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,

    RoomTypesRoutingModule,
    SharedModule,
    ReactiveFormsModule
    
    
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RoomTypesModule {

 }
