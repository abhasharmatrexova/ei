import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { AgentsAddComponent } from './agents-add/agents-add.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {MyTasksRoutingModule} from "../pages/my-tasks/my-tasks-routing.module";
import {listenToTriggers} from "ngx-bootstrap/utils";
import { AgentsFilterComponent } from './agents-filter/agents-filter.component';
import { AgentsPhoneComponent } from './agents-phone/agents-phone.component';
import { AgentsEmailsComponent } from './agents-emails/agents-emails.component';
import {AgentsUiStaffComponent} from './agents-ui-staff/agents-ui-staff.component';
import { AgentsCategoryComponent } from './agents-category/agents-category.component';
import { AgentsFeedbacksComponent } from './agents-feedbacks/agents-feedbacks.component';
import { AgentsPaymentConditionsComponent } from './agents-payment-conditions/agents-payment-conditions.component';
import { AgentsLostCasesComponent } from './agents-lost-cases/agents-lost-cases.component';
import { AgentsTourLeaderComponent } from './agents-tour-leader/agents-tour-leader.component';
import { AgentsBracketsComponent } from './agents-brackets/agents-brackets.component';
import { AgentsSalesStaffComponent } from './agents-sales-staff/agents-sales-staff.component';
import { AgentsAccountsComponent } from './agents-accounts/agents-accounts.component'




@NgModule({
  declarations: [
    AgentsListComponent,
    AgentsAddComponent,
    AgentsFilterComponent,
    AgentsPhoneComponent,
    AgentsEmailsComponent,
    AgentsUiStaffComponent,
    AgentsCategoryComponent,
    AgentsFeedbacksComponent,
    AgentsPaymentConditionsComponent,
    AgentsLostCasesComponent,
    AgentsTourLeaderComponent,
    AgentsBracketsComponent,
    AgentsSalesStaffComponent,
    AgentsAccountsComponent
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    SharedModule,
    CommonModule,
    MyTasksRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    BsDatepickerModule,
  ]
})
export class AgentsModule { }
