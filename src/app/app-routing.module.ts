import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {NoPageFoundComponent} from "./no-page-found/no-page-found.component";
import {FilterComponent} from "./filter/filter.component";
import {ApiretrieverComponent} from "./apiretriever/apiretriever.component";
import {BooksComponent} from "./books/books.component";
import {BookDetailsComponent} from "./book-details/book-details.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'apiretriever', component: ApiretrieverComponent},
  {path: 'books', component: BooksComponent},
  {path: 'book/:id', component: BookDetailsComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
