import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:"add",
    component :AddComponent

  },
  {
    path:"update/:id",
    component :AddComponent

  },
  {
    path:"",
    component :ListComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtcServicesRoutingModule { }
