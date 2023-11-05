import { Injectable } from '@angular/core';
import {Observable, of, tap, catchError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IBook} from "./IBook";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private url:string = "http://localhost:3000/books"
  public option = {}
   private handleError<T> (operation = 'string', result?: T) {

    return (error: any): Observable<T> => {
      console.error(error)
      console.log(`${operation} failed ${error.message}`);
      return of (result as T)
    }

  }

  // public headers = new HttpHeaders({
  //   'Content-Type': 'application/json', // Request JSON data
  //   // You can add other headers as needed
  //   // 'Authorization': 'Bearer your-auth-token'
  // });

  constructor(private http: HttpClient) { }


  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.url).pipe(
      tap( books => {console.log("You Fetched All Books")} ),
      catchError(this.handleError<IBook[]>('getAllHeroes', []))
    )
  }

  getBook(id:number) : Observable<IBook> {
    return this.http.get<IBook>(this.url+`/${id}`).pipe(
      tap( books => {console.log(`You Fetched  Book with id:${id}`)} ),
      catchError(this.handleError<IBook>('getAllHeroes'))

    )
  }
}
