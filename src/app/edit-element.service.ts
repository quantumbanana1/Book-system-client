import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IBook } from "./IBook";
import { LibraryService } from "./library.service";

export interface IAction {
  book?: IBook;
  id?: number;
  action: "addedBook" | "deletedBook" | "editedBook";
  changedKeys?: string[];
}

@Injectable({
  providedIn: "root",
})
export class EditElementService {
  constructor(private library: LibraryService) {}

  @Output() deleteAllMessagesEvent = new EventEmitter<any>();
  @Output() EditEvent = new EventEmitter<number>();

  private showElementBehaviour = new BehaviorSubject<[boolean, number | null]>([
    false,
    null,
  ]);
  notifyObservables = this.showElementBehaviour.asObservable();

  public ShowFormBehabiour = new BehaviorSubject<boolean>(false);
  notifyShowFormObservables = this.ShowFormBehabiour.asObservable();

  public ShowBookArray = new BehaviorSubject<IBook | {}>({});
  notifyListBooks = this.ShowBookArray.asObservable();

  public showNewBookStats = new BehaviorSubject<IAction | {}>({});
  notifyBookStats = this.showNewBookStats.asObservable();

  public showEditedBook = new BehaviorSubject<IBook | {}>({});
  notifyBook = this.showEditedBook.asObservable();

  public showFilteredArray = new BehaviorSubject<string>("");
  notifyToFilter = this.showFilteredArray.asObservable();

  deleteAllMessagesClick() {
    this.deleteAllMessagesEvent.emit(this.library.deleteAllBooks());
  }

  editBooks(id: number) {
    this.EditEvent.emit(id);
  }

  EditFormVisibility(state: boolean, id?: number) {
    console.log(state, id);
    this.showElementBehaviour.next([state, id]);
  }

  FormVisibility(state: boolean) {
    return this.ShowFormBehabiour.next(state);
  }

  editArrayBooks(date: IBook) {
    return this.ShowBookArray.next(date);
  }

  editBookStats(state: IAction) {
    if (state) {
      return this.showNewBookStats.next(state);
    }
  }

  editBook(book: IBook) {
    return this.showEditedBook.next(book);
  }

  filterArray(value: string) {
    return this.showFilteredArray.next(value);
  }
}
