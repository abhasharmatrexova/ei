import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsAddComponent } from './contracts-add/contracts-add.component';
import { ContractsListComponent } from './contracts-list/contracts-list.component';



const routes: Routes = [
  {
     path:"",
     component:ContractsListComponent
  },
  {
    path:"add",
    component :ContractsAddComponent

  },
  {
    path:"update/:id",
    component :ContractsAddComponent

  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule {

 }
