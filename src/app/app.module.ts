import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { ComplexImageComponent } from './complex-image/complex-image.component';
import { GamesGridComponent } from './games-grid/games-grid.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import { DecimalPipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { FreeSpinComponent } from './free-spin/free-spin.component';
import { FAQComponent } from './faq/faq.component';
import { SlotMachineComponent } from "./slot-machine/slot-machine.component";
import { LoginModuleComponent } from './login-module/login-module.component';
import { RegisterModuleComponent } from './register-module/register-module.component';
import { MineSlotMachineComponent } from './mine-slot-machine/mine-slot-machine.component';
import { GenericSlotMachineComponent } from './generic-slot-machine/generic-slot-machine.component';
import { FruitSlotMachineComponent } from './fruit-slot-machine/fruit-slot-machine.component';
import { PremiumSlotMachineComponent } from './premium-slot-machine/premium-slot-machine.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RouletteComponent } from './roulette/roulette.component';
import { HorseRaceComponent } from './horse-race/horse-race.component';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComplexImageComponent,
    GamesGridComponent,
    AdminPanelComponent,
    FooterComponent,
    HomeModuleComponent,
    FreeSpinComponent,
    FAQComponent,
    LoginModuleComponent,
    RegisterModuleComponent,
    MineSlotMachineComponent,
    GenericSlotMachineComponent,
    FruitSlotMachineComponent,
    PremiumSlotMachineComponent,
    RouletteComponent,
    HorseRaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    DecimalPipe,
    AsyncPipe,
    ReactiveFormsModule,
    NgbHighlight,
    SlotMachineComponent,
    HttpClientModule,
    FormsModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]



})
export class AppModule { }
