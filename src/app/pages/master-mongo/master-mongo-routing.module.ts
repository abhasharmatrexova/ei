import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'contracts', loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule) },
  { path: 'fairs-events-festivals', loadChildren: () => import('./events-fair-holidays/events-fair-holidays.module').then(m => m.EventsFairHolidaysModule) },
  { path: 'htl-supplier', loadChildren: () => import('./htl-supplier/htl-supplier.module').then(m => m.HtlSupplierModule) },
  
  { path: 'room-types', loadChildren: () => import('./room-types/room-types.module').then(m => m.RoomTypesModule) },
  { path: 'rst-services', loadChildren: () => import('./rst-types/rst-types.module').then(m => m.RstTypesModule) },
  { path: 'extra-services', loadChildren: () => import('./extra-services/extra-services.module').then(m => m.ExtraServicesModule) },
  { path: 'gui-services', loadChildren: () => import('./gui-services/gui-services.module').then(m => m.GuiServicesModule) },
  { path: 'mtc-services', loadChildren: () => import('./mtc-services/mtc-services.module').then(m => m.MtcServicesModule) },
  { path: 'ent-services', loadChildren: () => import('./ent-services/ent-services.module').then(m => m.EntServicesModule) },
  { path: 'supplier-chains', loadChildren: () => import('./supplier-chains/supplier-chains.module').then(m => m.SupplierChainsModule) },
  { path: 'luggage-services', loadChildren: () => import('./luggage-services/luggage-services.module').then(m => m.LuggageServicesModule) },
  { path: 'train-services', loadChildren: () => import('./train-services/train-services.module').then(m => m.TrainServicesModule) },
  { path: 'ferry-services', loadChildren: () => import('./ferry-services/ferry-services.module').then(m => m.FerryServicesModule) },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterMongoRoutingModule { }
