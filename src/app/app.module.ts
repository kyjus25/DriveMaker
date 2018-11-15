import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {appRoutes} from './routes';
import {RouterModule} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {LandingComponent} from './landing/landing.component';
import {HttpClientModule} from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    LandingComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MenuModule,
    ChartModule,
    DropdownModule,
    AutoCompleteModule,
    BrowserModule,
    CardModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
