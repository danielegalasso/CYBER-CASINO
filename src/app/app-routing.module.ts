import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './model/routeConstants';
import { HomeModuleComponent } from './home-module/home-module.component';
import { BonusModuleComponent } from './bonus-module/bonus-module.component';
import { FAQComponent } from './faq/faq.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { RegisterModuleComponent } from './register-module/register-module.component';
import { AuthGuardService } from './service/auth-guard.service';
import { GenericSlotMachineComponent } from './generic-slot-machine/generic-slot-machine.component';
import { PremiumSlotMachineComponent } from './premium-slot-machine/premium-slot-machine.component';
import { FruitSlotMachineComponent } from './fruit-slot-machine/fruit-slot-machine.component';
import { MineSlotMachineComponent } from './mine-slot-machine/mine-slot-machine.component';

const routes: Routes = [
  {
    component:MineSlotMachineComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

