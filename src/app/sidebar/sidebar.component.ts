import { Component, OnInit } from "@angular/core";
import { IBook } from "../IBook";
import { LibraryService } from "../library.service";
import { EditElementService, IAction } from "../edit-element.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(
    private libraryService: LibraryService,
    private editService: EditElementService,
  ) {}

  public books: number = 0;
  public completedBooks: number = 0;
  public totalPages: number = 0;
  public readPages: number = 0;
  private arrayBooks: IBook[];

  ngOnInit(): void {
    this.libraryService.getAllBooks().subscribe((books) => {
      this.arrayBooks = books;
      this.sumProperties(books);
    });

    this.editService.notifyBookStats.subscribe((state: IAction) => {
      this.editProperties(state);
      this.updateArrayBooks();
    });
  }

  sumProperties(books: IBook[]) {
    books.forEach((book) => {
      this.books += 1;
      if (book.completed) {
        this.completedBooks += 1;
      }
      this.totalPages += book.pages;
      this.readPages += book.completedPages;
    });
  }

  editProperties(state: IAction) {
    console.log(state);

    if (state.action === "addedBook") {
      this.books += 1;
      if (state.book.completed) {
        this.completedBooks += 1;
      }
      this.totalPages += state.book.pages;
      this.readPages += state.book.completedPages;
    }

    if (state.action === "deletedBook") {
      const book = this.arrayBooks.find((book) => book.id === state.id);
      this.books -= 1;
      if (book.completed) {
        this.completedBooks -= 1;
      }
      this.totalPages -= book.pages;
      this.readPages -= book.completedPages;
    }

    if (state.action === "editedBook") {
      const book = this.arrayBooks.find((book) => book.id === state.id);
      state.changedKeys.forEach((key) => {
        if (key === "completed") {
          if (book.completed && !state.book.completed) {
            this.completedBooks -= 1;
          } else if (!book.completed && state.book.completed) {
            this.completedBooks += 1;
          }
        }
        if (key === "pages") {
          this.totalPages -= book.pages;
          this.totalPages += state.book.pages;
        }

        if (key === "completedPages") {
          this.readPages -= book.completedPages;
          this.readPages += state.book.completedPages;
        }
      });
    }
  }

  updateArrayBooks(): void {
    this.libraryService.getAllBooks().subscribe((books) => {
      this.arrayBooks = books;
    });
  }
}
