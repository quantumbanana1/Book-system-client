import { Component } from '@angular/core';
import {EditElementService} from "../edit-element.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private editElementService: EditElementService) {


  }

  deleteAllMessagesClick() {
    this.editElementService.deleteAllMessagesClick();
  }




}
