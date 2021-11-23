import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { SearchbarComponent } from './searchbar/searchbar.component';
import { FilterlistComponent } from './filterlist/filterlist.component';
import {FilterComponent} from "./filter.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    SearchbarComponent,
    FilterlistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  exports: [
    SearchbarComponent,
    FilterlistComponent
  ],
  bootstrap: [FilterComponent]
})
export class FilterModule { }
