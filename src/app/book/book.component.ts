import {Component, Input} from '@angular/core';
import {IBook} from "../IBook";
import {LibraryService} from "../library.service";
import {EditElementService} from "../edit-element.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  constructor(private library: LibraryService, private editService: EditElementService) {

  }

  @Input() book?: IBook;


  deleteBook(id: number | undefined) {

    if (id === undefined) {
      console.log("Deleting process failed....");
      console.log("111")
      return;
    }

    this.library.deleteBook(id).subscribe(
        _ => {
          this.editService.editBooks(id);
        }
    )

  }
}
