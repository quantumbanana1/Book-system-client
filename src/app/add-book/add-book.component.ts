import { Component } from '@angular/core';
import { EditElementService } from '../edit-element.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {


  constructor(private editService: EditElementService) {}



  showForm() {
    console.log('click');
    const prevState = this.editService.ShowFormBehabiour.getValue();
    console.log(prevState);
    let state;

    if (prevState) {
      state = false;
    } 
    else {
      state = true
    }

    console.log(state);
    this.editService.FormVisibility(state);
  }








}
