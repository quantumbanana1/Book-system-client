import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from "@angular/core";
import { LibraryService } from "../library.service";
import { EditElementService } from "../edit-element.service";
import { fromEvent, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { IBook } from "../IBook";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"],
})
export class SearchBoxComponent implements AfterViewInit {
  @ViewChild("searchInput") searchInput: ElementRef;
  searchResult: string = "";
  books: IBook[];
  filteredBook: IBook | IBook[];

  constructor(
    private library: LibraryService,
    private editService: EditElementService,
  ) {}

  public searchValue: string = "";

  setUpSearchObservable(): Observable<string> {
    return fromEvent<"keyup">(this.searchInput.nativeElement, "keyup").pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(() => of(this.searchInput.nativeElement.value)),
    );
  }

  ngAfterViewInit() {
    this.setUpSearchObservable().subscribe((value) => {
      if (value.toLowerCase() === this.searchResult) {
        return;
      } else {
        this.searchResult = value.toLowerCase();
        this.editService.filterArray(this.searchResult);
      }
    });
  }
}
