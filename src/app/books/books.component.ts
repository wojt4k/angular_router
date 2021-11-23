import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Book} from "../models/book";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  bookForm = this.forms.group({
    'title': ['', Validators.required],
    'author': ['', Validators.required],
    'description': ['', Validators.required]
  });

  constructor(private service: DataService, private forms: FormBuilder) { }

  ngOnInit(): void {
    if (this.service.states.books.getValue().length === 0)
    {
      console.log("download")
      this.service.getBooks().subscribe((response) =>
      {
        this.books = response
        this.service.states.books.next(this.books)
      })
    } else {
      console.log("local")
      this.books = this.service.states.books.getValue() || {};
    }

    this.bookForm.valueChanges.subscribe(
      data => {
        this.books.push(data)
        this.service.states.books.next(this.books)
        // this.service.states.searchbar.searchString.next(data)
        // this.service.updateVegetableName(data)
      }
    )
  }

}
