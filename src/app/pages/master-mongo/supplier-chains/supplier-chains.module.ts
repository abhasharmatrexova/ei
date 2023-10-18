import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierChainsRoutingModule } from './supplier-chains-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SupplierChainsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SupplierChainsModule { }
