import { Component, OnInit } from "@angular/core";
import { EditElementService } from "../edit-element.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LibraryService } from "../library.service";
import { IBook } from "../IBook";
import { Observable, Subscription } from "rxjs";
import { pageValidator } from "../form-book/form-book.component";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.css"],
})
export class EditFormComponent implements OnInit {
  public isShown = false;
  editForm: FormGroup = this.fb.group(
    {
      authorName: ["", [Validators.required]],
      authorSurname: ["", [Validators.required]],
      title: ["", [Validators.required]],
      pages: ["", [Validators.required]],
      completedPages: ["2", [Validators.required]],
      completed: [false, [Validators.required]],
    },
    { validators: [pageValidator] },
  );
  public book: IBook;

  constructor(
    private editService: EditElementService,
    private fb: FormBuilder,
    private library: LibraryService,
  ) {}

  ngOnInit() {
    this.editService.notifyObservables.subscribe((res) => {
      if (res[0]) {
        this.createForm(res[1]);
        this.isShown = true;
      } else {
        this.isShown = false;
      }
    });
  }

  hideForm() {
    this.editService.EditFormVisibility(false, null);
    this.editForm = null;
  }

  createForm(id: number) {
    this.library.getBook(id).subscribe((book) => {
      this.book = book;
      this.editForm = this.fb.group({
        title: [this.book.title, [Validators.required]],
        authorName: [this.book.authorName, [Validators.required]],
        authorSurname: [this.book.authorSurname, [Validators.required]],
        pages: [this.book.pages, [Validators.required]],
        completedPages: [this.book.completedPages, [Validators.required]],
        completed: [this.book.completed, [Validators.required]],
        id: [this.book.id],
      });
    });
  }

  onSubmit() {
    let notChanged: boolean = true;
    let changedKeys = [];
    const book: IBook = {
      title: this.editForm.value.title,
      authorName: this.editForm.value.authorName,
      authorSurname: this.editForm.value.authorSurname,
      pages: this.editForm.value.pages,
      completedPages: this.editForm.value.completedPages,
      completed: this.editForm.value.completed,
      id: this.book.id,
    };

    if (Object.keys(book).length === Object.keys(this.book).length) {
      Object.entries(book).forEach(([key, value]) => {
        if (value !== this.book[key]) {
          notChanged = false;
          if (
            key === "completed" ||
            key === "pages" ||
            key === "completedPages"
          ) {
            changedKeys.push(key);
          }
        }
      });
    }

    if (!notChanged) {
      return this.library
        .updateBook(book, this.book.id)
        .subscribe((request) => {
          this.editService.editBookStats({
            action: "editedBook",
            book: book,
            changedKeys: changedKeys,
            id: this.book.id,
          });
        });
    } else {
      return 0;
    }
  }
}
