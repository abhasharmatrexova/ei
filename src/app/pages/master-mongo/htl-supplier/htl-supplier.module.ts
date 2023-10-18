import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtlSupplierRoutingModule } from './htl-supplier-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CloseDaysComponent } from './close-days/close-days.component';
import { FreePolicyComponent } from './free-policy/free-policy.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaymentPolicyComponent } from './payment-policy/payment-policy.component';
import { AccountsComponent } from './accounts/accounts.component';
import { RoomingServicesComponent } from './rooming-services/rooming-services.component';
import { TextMediaComponent } from './text-media/text-media.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    CloseDaysComponent,
    FreePolicyComponent,
    CancellationPolicyComponent,
    FeedbacksComponent,
    PaymentPolicyComponent,
    AccountsComponent,
    RoomingServicesComponent,
    TextMediaComponent
  ],
  imports: [
    CommonModule,
    HtlSupplierRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AccordionModule,
    NgxDropzoneModule,
    BsDatepickerModule
  ]
})
export class HtlSupplierModule { }
