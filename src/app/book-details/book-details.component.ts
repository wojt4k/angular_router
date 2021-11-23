import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  productId: number;

  constructor(private actRoute: ActivatedRoute) {
    this.productId = this.actRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

  }

}
