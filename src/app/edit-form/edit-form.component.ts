import {Component, OnInit} from '@angular/core';
import {EditElementService} from "../edit-element.service";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit{


  public isShown = false;


  constructor(private editService: EditElementService) {
  }

  ngOnInit() {
    this.editService.notifyObservables.subscribe(res => {
      if (res) {
        this.isShown = true;

      }
      else {
        this.isShown = false;
      }
    })

  }

  hideForm() {
    this.editService.EditFormVisibility(false);
  }
}
