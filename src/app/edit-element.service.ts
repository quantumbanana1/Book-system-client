import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {IBook} from "./IBook";
import {LibraryService} from "./library.service";

@Injectable({
  providedIn: 'root'
})
export class EditElementService {

  constructor(private library: LibraryService) { }


  @Output() deleteAllMessagesEvent = new EventEmitter<any>()
  @Output() EditEvent = new EventEmitter<number>()


  deleteAllMessagesClick() {

    console.log("dziala")
    this.deleteAllMessagesEvent.emit(
         this.library.deleteAllBooks()
    )

  }


  editBooks(id:number) {
     this.EditEvent.emit(id);
  }




}
