import { Component, OnInit } from '@angular/core';
import { IBook } from '../IBook';
import { LibraryService } from '../library.service';
import {EditElementService, IAction} from "../edit-element.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{


  constructor(private libraryService: LibraryService, private editService : EditElementService) {}

  public books : number = 0;
  public completedBooks : number = 0;
  public totalPages : number = 0;



  ngOnInit(): void {

    this.libraryService.getAllBooks().subscribe((books) => {
      this.sumProperties(books);
    })


    this.editService.notifyBookStats.subscribe((state:IAction<"addedBook" | "deletedBook"> ) => {
    this.editProperties(state);

    })
    
  }

  sumProperties(books: IBook[]) {
    books.forEach((book) => {
      this.books += 1;
      if (book.completed) {
        this.completedBooks += 1;
      }
      this.totalPages += book.pages
    })

  }

  editProperties(state) {

    if (state.action === "addedBook") {
      this.books += 1;
      if (state.book.completed) {
        this.completedBooks += 1;
      }
      this.totalPages += state.book.pages;

    }

  }




}
