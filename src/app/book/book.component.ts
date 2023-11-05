import {Component, Input} from '@angular/core';
import {IBook} from "../IBook";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  constructor() {

  }

  @Input() book?:  IBook;

}
