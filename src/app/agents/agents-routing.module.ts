import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsAddComponent } from './agents-add/agents-add.component';
import { AgentsListComponent } from './agents-list/agents-list.component';
import {AgentsFilterComponent} from './agents-filter/agents-filter.component';
import {AgentsPhoneComponent} from "./agents-phone/agents-phone.component";
import {AgentsEmailsComponent} from "./agents-emails/agents-emails.component";
import {AgentsUiStaffComponent} from "./agents-ui-staff/agents-ui-staff.component";
/*import { ListjsComponent } from './listjs/listjs.component';*/



const routes: Routes = [
    {path:"list", component :AgentsListComponent},
    {path:"add",component :AgentsAddComponent},
  {path:"filter",component:AgentsFilterComponent},
  {path:"phone",component:AgentsPhoneComponent},
  {path:"email",component:AgentsEmailsComponent},
  {path:"ui-staff",component:AgentsUiStaffComponent}

  /* {path:"list1",component :ListjsComponent}*/
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
  ]
})
export class AgentsRoutingModule { }
