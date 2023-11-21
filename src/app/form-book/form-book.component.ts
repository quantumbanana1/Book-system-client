import { Component, OnInit } from '@angular/core';
import { EditElementService } from '../edit-element.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LibraryService } from '../library.service';





export function pageValidator (control: AbstractControl): {[key:string]: boolean}| null  {
    const pages= control.get('pages').value as number;
    const completedPages = control.get('completedPages').value as number;
    if ( pages < completedPages) {
      return {'customError': true}
    }
    return null;


  }


@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css'],
  // imports: [ReactiveFormsModule],
})


export class FormBookComponent implements OnInit {

  public isShown = false;
  bookForm : FormGroup;

  


  constructor(private library: LibraryService, private editService: EditElementService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.editService.notifyShowFormObservables.subscribe(res => {
      
      if (res) {
        console.log(1)
        this.isShown = true;
      }
      else {
        console.log(2)
        this.isShown = false;
      }
    })

    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      title: ['', [Validators.required]],
      pages: ['', [Validators.required]],
      completedPages: ['2', [Validators.required]],
      bookCompletion: [false, [Validators.required]],
    },{ validators: [pageValidator] });

  
    // this.bookForm.valueChanges.subscribe(() => {
    //   this.bookForm.updateValueAndValidity();
    // });
    
  }

  onSubmit() {
    console.log(this.bookForm.value)
    return this.library.addBook(this.bookForm.value).subscribe(
      response => {
        console.log('Book added succesfully')
        this.editService.editArrayBooks(response);
        
      },
      error => {
        console.error(`Error adding book:`, error);
      }
    );

  }



  



}
