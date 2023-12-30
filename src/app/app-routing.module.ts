import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { HomeModuleComponent } from './home-module/home-module.component';

const routes: Routes = [
  {
    component:HomeModuleComponent,
    path:''
  },
  {
    component:AdminModuleComponent,
    path:'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

