import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTasksListComponent }  from './my-tasks-list/my-tasks-list.component';
import { MyTasksAddComponent }  from './my-tasks-add/my-tasks-add.component';
const routes: Routes = [
  {
    path:"list",
    component :MyTasksListComponent

  },
  {
    path:"add",
    component :MyTasksAddComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTasksRoutingModule { }
