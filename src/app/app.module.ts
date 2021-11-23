import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { FilterComponent } from './filter/filter.component';
import {FilterModule} from "./filter/filter.module";
import { ApiretrieverComponent } from './apiretriever/apiretriever.component';
import {HttpClientModule} from "@angular/common/http";
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NoPageFoundComponent,
    FilterComponent,
    ApiretrieverComponent,
    BooksComponent,
    BookDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
