import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BudibaseIframeComponent } from '../shared/budibase-iframe/budibase-iframe.component';




const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'my-tasks', loadChildren: () => import('./my-tasks/my-tasks.module').then(m => m.MyTasksModule) },
  { path: '', loadChildren: () => import('./master-mongo/master-mongo.module').then(m => m.MasterMongoModule) },
 
  { path: 'tour-types', component: BudibaseIframeComponent},
  { path: 'supplier-types', component: BudibaseIframeComponent},
  { path: 'meal-types', component: BudibaseIframeComponent},
  { path: 'agent-category', component: BudibaseIframeComponent},
  { path: 'languages', component: BudibaseIframeComponent},
  { path: 'countries', component: BudibaseIframeComponent},
  { path: 'cities', component: BudibaseIframeComponent},
  { path: 'currencies', component: BudibaseIframeComponent},
  { path: 'companies', component: BudibaseIframeComponent},
  { path: 'offices', component: BudibaseIframeComponent},
  { path: 'ei-staff', component: BudibaseIframeComponent},
  { path: 'transfer-locations', component: BudibaseIframeComponent},
  { path: 'designations', component: BudibaseIframeComponent},
  { path: 'departments', component: BudibaseIframeComponent},
  { path: 'meal-courses', component: BudibaseIframeComponent},
  { path: 'service-types', component: BudibaseIframeComponent},
  { path: 'cousines', component: BudibaseIframeComponent},
  { path: 'markets', component: BudibaseIframeComponent},
  { path: 'lead-sources', component: BudibaseIframeComponent},
  { path: 'allotment-types', component: BudibaseIframeComponent},
  { path: 'system-departments', component: BudibaseIframeComponent},
  { path: 'contacts', component: BudibaseIframeComponent},

  // suppliers

  // Contracts

  //Status
  { path: 'tasks', component: BudibaseIframeComponent},
  { path: 'quotations', component: BudibaseIframeComponent},
  { path: 'tour', component: BudibaseIframeComponent},
  { path: 'suppliers', component: BudibaseIframeComponent},
  { path: 'staff', component: BudibaseIframeComponent},
  { path: 'agents', component: BudibaseIframeComponent},
  { path: 'contacts', component: BudibaseIframeComponent},
  { path: 'bank-accounts', component: BudibaseIframeComponent},
  { path: 'pax-lists', component: BudibaseIframeComponent},
  { path: 'leads', component: BudibaseIframeComponent},
  { path: 'invoices', component: BudibaseIframeComponent},
  { path: 'bookings', component: BudibaseIframeComponent},
  

  

  // Services type
  { path: 'ent', component: BudibaseIframeComponent},
  { path: 'fri', component: BudibaseIframeComponent},
  { path: 'gui', component: BudibaseIframeComponent},
  { path: 'htl', component: BudibaseIframeComponent},
  { path: 'mtc', component: BudibaseIframeComponent},
  { path: 'oth', component: BudibaseIframeComponent},
  { path: 'rst', component: BudibaseIframeComponent},
  { path: 'trn', component: BudibaseIframeComponent},

  //Screen
  { path: 'screens', component: BudibaseIframeComponent},

  //versions
  { path: 'versions', component: BudibaseIframeComponent},


 

]
@NgModule({
  declarations: [],
  // imports: [
  //   CommonModule
  // ]

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
