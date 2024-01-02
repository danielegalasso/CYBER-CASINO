import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import { BonusModuleComponent } from './bonus-module/bonus-module.component';
import { FAQComponent } from './faq/faq.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { RegisterModuleComponent } from './register-module/register-module.component';

const routes: Routes = [
  {
    component:HomeModuleComponent,
    path:''
  },
  {
    component:AdminPanelComponent,
    path:'admin'
  },
  {
    component:BonusModuleComponent,
    path:'bonus'
  },
  {
    component:FAQComponent,
    path:'faq' 
  },
  {
    component:LoginModuleComponent,
    path:'login'
  },
  {
    component:RegisterModuleComponent,
    path:'register'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

