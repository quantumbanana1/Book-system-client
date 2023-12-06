import { Component, Input } from "@angular/core";
import { IBook } from "../IBook";
import { LibraryService } from "../library.service";
import { EditElementService, IAction } from "../edit-element.service";
import { fade2 } from "../animations";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
  animations: [fade2],
})
export class BookComponent {
  constructor(
    private library: LibraryService,
    private editService: EditElementService,
  ) {}

  @Input() book?: IBook;

  public isHidden = false;

  deleteBook(id: number | undefined) {
    if (id === undefined) {
      console.log("Deleting process failed....");
      return;
    }
    this.isHidden = true;
    setTimeout(() => {
      this.library.deleteBook(id).subscribe((_) => {
        this.editService.editBooks(id);
        const state: IAction = {
          id: id,
          action: "deletedBook",
        };
        this.editService.editBookStats(state);
      });
    }, 201);
  }

  showEditForm(id: number) {
    this.editService.EditFormVisibility(true, id);
  }
}
