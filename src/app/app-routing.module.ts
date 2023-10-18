import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './core/guards/auth.guard'; // Import the AuthGuard from your shared folder


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  { path: 'agents',component: LayoutsComponent, loadChildren: () => import('./agents/agents.module').then(m => m.AgentsModule)  },
  { path: '', component: LayoutsComponent, canActivate: [AuthGuard] , loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
