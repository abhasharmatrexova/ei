import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

// page Module
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { RstTypesComponent } from './master-mongo/rst-types/rst-types.component';
// import { ExtraServicesComponent } from './master-mongo/extra-services/extra-services.component';
// import { GuiServicesComponent } from './master-mongo/gui-services/gui-services.component';
// import { MtcServicesComponent } from './master-mongo/mtc-services/mtc-services.component';
// import { EntServicesComponent } from './master-mongo/ent-services/ent-services.component';
// import { EventsFairHolidaysComponent } from './master-mongo/events-fair-holidays/events-fair-holidays.component';



@NgModule({
  declarations: [
  
    // MyTasksComponent
  
    
        // RstTypesComponent,
        // ExtraServicesComponent,
        // GuiServicesComponent,
        // MtcServicesComponent,
        // EntServicesComponent,
        // EventsFairHolidaysComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    // NgSelectModule
  ]
})
export class PagesModule {  

}
