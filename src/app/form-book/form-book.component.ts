import {Component, OnInit, ViewChild} from "@angular/core";
import { EditElementService } from "../edit-element.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { Validators } from "@angular/forms";
import { LibraryService } from "../library.service";
import { slideOutAnimation } from "../animations";

export function pageValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const pages = control.get("pages").value as number;
  const completedPages = control.get("completedPages").value as number;
  if (pages < completedPages) {
    return { customError: true };
  }
  return null;
}

@Component({
  selector: "app-form-book",
  templateUrl: "./form-book.component.html",
  styleUrls: ["./form-book.component.css"],
  animations: [slideOutAnimation],
})
export class FormBookComponent implements OnInit {
  public isShown = false;
  bookForm: FormGroup;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private library: LibraryService,
    private editService: EditElementService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.editService.notifyShowFormObservables.subscribe((res) => {
      if (res) {
        this.isShown = true;
      } else {
        this.isShown = false;
      }
    });

    this.bookForm = this.fb.group(
      {
        name: ["", [Validators.required]],
        surname: ["", [Validators.required]],
        title: ["", [Validators.required]],
        pages: ["", [Validators.required]],
        completedPages: ["", [Validators.required]],
        bookCompletion: [false, [Validators.required]],
      },
      { validators: [pageValidator] },
    );
  }

  onSubmit() {
    const book = {
      title: this.bookForm.value.title,
      authorName: this.bookForm.value.name,
      authorSurname: this.bookForm.value.surname,
      pages: this.bookForm.value.pages,
      completedPages: this.bookForm.value.completedPages,
      completed: this.bookForm.value.bookCompletion,
    };

    return this.library.addBook(book).subscribe(
      (response) => {
        this.editService.editArrayBooks(response);
        this.editService.editBookStats({ book: book, action: "addedBook" });
        this.editService.FormVisibility(false);
        this.formDirective.resetForm();
        // this.bookForm.reset();
      },
      (error) => {
        console.error(`Error adding book:`, error);
      },
    );
  }
}
