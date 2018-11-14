import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SessionComponent } from './session.component';
import {DialogModule} from 'primeng/dialog';
import {SharedModule} from 'primeng/shared';


@NgModule({
  declarations: [
    SessionComponent,
  ],
  imports: [
    AutoCompleteModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [SessionComponent]
})
export class SessionModule { }
