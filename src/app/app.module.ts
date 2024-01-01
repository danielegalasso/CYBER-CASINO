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
import { SlotErnestoComponent } from './slot-ernesto/slot-ernesto.component';
import { BonusModuleComponent } from './bonus-module/bonus-module.component';
import { FAQComponent } from './faq/faq.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { RegisterModuleComponent } from './register-module/register-module.component';


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
    SlotErnestoComponent,
    BonusModuleComponent,
    FAQComponent,
    LoginModuleComponent,
    RegisterModuleComponent
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
    NgbHighlight
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
