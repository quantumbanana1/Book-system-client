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
    const book = {
      title: this.bookForm.value.title,
      authorName: this.bookForm.value.name,
      authorSurname: this.bookForm.value.surname,
      pages: this.bookForm.value.pages,
      completedPages: this.bookForm.value.completedPages,
      completed: this.bookForm.value.bookCompletion,}
    console.log(this.bookForm.value.surname);

    return this.library.addBook(book).subscribe(
      response => {
        console.log('Book added succesfully')
        this.editService.editArrayBooks(response)
        this.editService.editBookStats({book: book, action: "addedBook"});
        
      },
      error => {
        console.error(`Error adding book:`, error);
      }
    );

  }



  



}
