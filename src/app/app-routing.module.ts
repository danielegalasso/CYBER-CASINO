import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import { BonusModuleComponent } from './bonus-module/bonus-module.component';

const routes: Routes = [
  {
    component:HomeModuleComponent,
    path:''
  },
  {
    component:AdminModuleComponent,
    path:'admin'
  },
  {
    component:BonusModuleComponent,
    path:'bonus'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

