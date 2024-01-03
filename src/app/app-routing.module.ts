import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './model/routeConstants';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import { BonusModuleComponent } from './bonus-module/bonus-module.component';
import { FAQComponent } from './faq/faq.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { RegisterModuleComponent } from './register-module/register-module.component';
import { SlotErnestoComponent } from './slot-ernesto/slot-ernesto.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    component:HomeModuleComponent,
    path: RouteConstants.home
  },
  {
    component:BonusModuleComponent,
    path: RouteConstants.bonus,
    canActivate: [AuthGuardService]
  },
  {
    component:FAQComponent,
    path: RouteConstants.faq
  },
  {
    component:LoginModuleComponent,
    path: RouteConstants.login
  },
  {
    component:RegisterModuleComponent,
    path: RouteConstants.register
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

