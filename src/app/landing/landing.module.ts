import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LandingComponent } from './landing.component';


@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    AutoCompleteModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [LandingComponent]
})
export class LandingModule { }
