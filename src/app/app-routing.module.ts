import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './model/routeConstants';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import { FAQComponent } from './faq/faq.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { RegisterModuleComponent } from './register-module/register-module.component';
import { AuthGuardService } from './model/services/auth-guard.service';
import { GenericSlotMachineComponent } from './generic-slot-machine/generic-slot-machine.component';
import { PremiumSlotMachineComponent } from './premium-slot-machine/premium-slot-machine.component';
import { FruitSlotMachineComponent } from './fruit-slot-machine/fruit-slot-machine.component';
import { MineSlotMachineComponent } from './mine-slot-machine/mine-slot-machine.component';
import {RouletteComponent} from "./roulette/roulette.component";
import {HorseRaceComponent} from "./horse-race/horse-race.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    component:HomeModuleComponent,
    path: RouteConstants.home
  },
  {
    component:AdminPanelComponent,
    path: RouteConstants.admin,
    //canActivate: [AuthGuardService]
  },
  {
    component:FruitSlotMachineComponent,
    path: RouteConstants.fruitSlot,
    //canActivate: [AuthGuardService]
  },
  {
    component:PremiumSlotMachineComponent,
    path: RouteConstants.premiumSlot,
    //canActivate: [AuthGuardService]
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

  {component:MineSlotMachineComponent,
    path: RouteConstants.mineSlot,
  },
  {
    component:RouletteComponent,
    path: RouteConstants.roulette,
  },
  {
    component:HorseRaceComponent,
    path: RouteConstants.stallionSprint,
  },
  {
    component:ProfileComponent,
    path: RouteConstants.profile,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

