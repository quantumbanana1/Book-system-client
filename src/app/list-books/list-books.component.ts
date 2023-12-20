import { Component, OnInit } from "@angular/core";
import { LibraryService } from "../library.service";
import { IBook } from "../IBook";
import { EditElementService } from "../edit-element.service";
import { forkJoin, of } from "rxjs";

@Component({
  selector: "app-list-books",
  templateUrl: "./list-books.component.html",
  styleUrls: ["./list-books.component.css"],
})
export class ListBooksComponent implements OnInit {
  public books: IBook[] = [];

  constructor(
    private library: LibraryService,
    private editService: EditElementService,
  ) {}

  ngOnInit() {
    this.library.getAllBooks().subscribe((values) => {
      this.books = values;
    });

    this.editService.deleteAllMessagesEvent.subscribe((e) => {
      this.books = [];
    });

    this.editService.EditEvent.subscribe((id) => {
      this.editBooksArray(id);
    });

    this.editService.notifyListBooks.subscribe((res) => {
      this.library.getAllBooks().subscribe((books) => {
        this.books = books;
      });
    });

    this.editService.notifyBook.subscribe((book: IBook) => {
      const index = this.books.findIndex((b) => b.id === book.id);
      this.books[index] = book;
    });

    this.editService.notifyToFilter.subscribe((value: string) => {
      this.books = this.filterBooks(value);
    });
  }

  editBooksArray(id: number) {
    const newSetOfBooks = this.books.filter((book) => book.id !== id);
    this.books = newSetOfBooks;
  }

  filterBooks(value: string): IBook[] | [] {
    const searchResultCleared = value.replace(/\s+/g, " ");
    const splittedValue = searchResultCleared.split(" ");
    const filteredArray = this.books.filter((book: IBook) => {
      if (searchResultCleared === book.title.toLowerCase()) {
        return book;
      } else if (
        splittedValue.includes(book.authorName.toLowerCase()) &&
        splittedValue.includes(book.authorSurname.toLowerCase())
      ) {
        return book;
      } else if (
        splittedValue.includes(book.authorName.toLowerCase()) &&
        !splittedValue.includes(book.authorSurname.toLowerCase())
      ) {
        return book;
      } else if (
        !splittedValue.includes(book.authorName.toLowerCase()) &&
        splittedValue.includes(book.authorSurname.toLowerCase())
      ) {
        return book;
      } else if (
        splittedValue.some((value) =>
          book.title
            .toLowerCase()
            .replace(/\s+/g, " ")
            .split(" ")
            .includes(value),
        )
      ) {
        return book;
      } else {
        return null;
      }
    });

    if (filteredArray.length === 0) {
      let books: IBook[] = [];
      this.library.getAllBooks().subscribe((values) => {
        values.map((book) => {
          books.push(book);
        });
      });
      return books;
    } else {
      return filteredArray;
    }
  }
}
