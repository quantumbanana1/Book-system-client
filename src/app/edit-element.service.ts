import {EventEmitter, Injectable, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {IBook} from "./IBook";
import {LibraryService} from "./library.service";


export interface  IAction <T extends string> {
  book: IBook,
  action: T

}

@Injectable({
  providedIn: 'root'
})
export class EditElementService {

  constructor(private library: LibraryService) { }


  @Output() deleteAllMessagesEvent = new EventEmitter<any>()
  @Output() EditEvent = new EventEmitter<number>()

  private showElementBehaviour = new BehaviorSubject<boolean>(false);
  notifyObservables = this.showElementBehaviour.asObservable()

  public ShowFormBehabiour = new BehaviorSubject<boolean>(false);
  notifyShowFormObservables = this.ShowFormBehabiour.asObservable();

  public ShowBookArray = new BehaviorSubject<IBook | {}>({});
  notifyListBooks = this.ShowBookArray.asObservable();

  public showNewBookStats = new BehaviorSubject<IAction<"addedBook" | "deletedBook" > | {}>({});
  notifyBookStats = this.showNewBookStats.asObservable();


  deleteAllMessagesClick() {
    this.deleteAllMessagesEvent.emit(
         this.library.deleteAllBooks()
    )

  }


  editBooks(id:number) {
     this.EditEvent.emit(id);
  }


  EditFormVisibility(state:boolean) {
    this.showElementBehaviour.next(state);

  }


  FormVisibility(state:boolean) {
    return this.ShowFormBehabiour.next(state);
  }

  editArrayBooks(date : IBook) {
    return this.ShowBookArray.next(date);

  }

  editBookStats(state: IAction<"addedBook" | "deletedBook">) {

    if (state) {
      return this.showNewBookStats.next(state)
    }


  }
}
