import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//model 
import { MasterMongoRoutingModule } from './master-mongo-routing.module';

// component
// import { EntServicesComponent } from './ent-services/ent-services.component';
// import { EventsFairHolidaysComponent } from './events-fair-holidays/events-fair-holidays.component';
// import { ListComponent } from './events-fair-holidays/list/list.component';
// import { AddComponent } from './events-fair-holidays/add/add.component';
// import { RoomTypesModule } from './room-types/room-types.module';


@NgModule({
  declarations: [
    // RoomTypesModule,
    // EventsFairHolidaysComponent,
    // ListComponent,
    // AddComponent,
  ],
  imports: [
    MasterMongoRoutingModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MasterMongoModule {

 }
