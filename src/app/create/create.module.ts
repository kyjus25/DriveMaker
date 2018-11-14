import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CreateComponent } from './create.component';

@NgModule({
  declarations: [
    CreateComponent,
  ],
  imports: [
    AutoCompleteModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [CreateComponent]
})
export class CreateModule { }
