import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from '../events-fair-holidays/add/add.component';
import { ListComponent } from '../events-fair-holidays/list/list.component';

const routes: Routes = [
  {
    path:'add',
    component:AddComponent
  },
  {
    path:'',
    component:ListComponent
  },
  {
    path:'update/:id',
    component:AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsFairHolidaysRoutingModule { }
