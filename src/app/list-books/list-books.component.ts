import {Component, OnInit} from '@angular/core';
import {LibraryService} from "../library.service";
import {IBook} from "../IBook";
import {of, Subscription} from "rxjs";
import {EditElementService} from "../edit-element.service";

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit{

  public books: IBook[] = [];

  constructor(private library:LibraryService, private editService: EditElementService) {


  }


  ngOnInit() {
    this.library.getAllBooks().subscribe(values => {
      this.books = values;
    })

     this.editService.deleteAllMessagesEvent.subscribe( e => {
       this.books = [];
     } );


     this.editService.EditEvent.subscribe(id => {
         this.editBooksArray(id);

     })

     this.editService.notifyListBooks.subscribe(res => {
      this.library.getAllBooks().subscribe(books => {
        this.books = books;
      })

     })

  }


  editBooksArray(id:number) {
      const newSetOfBooks = this.books.filter(book => book.id !== id);
      this.books = newSetOfBooks;
      console.log(newSetOfBooks);
  }

}
