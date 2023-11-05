import {Component, OnInit} from '@angular/core';
import {LibraryService} from "../library.service";
import {IBook} from "../IBook";
import {of, Subscription} from "rxjs";

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit{

  public books: IBook[] = [];

  constructor(private library:LibraryService) {
  }


  ngOnInit() {
    this.library.getAllBooks().subscribe(values => {
      this.books = values;
    })
  }

}
