import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { ListBooksComponent } from "./list-books/list-books.component";
import { BookComponent } from "./book/book.component";
import { ContainerComponent } from "./container/container.component";
import { BottomContainerComponent } from "./bottom-container/bottom-container.component";
import { FormBookComponent } from "./form-book/form-book.component";
import { NgOptimizedImage } from "@angular/common";
import { SearchBoxComponent } from "./search-box/search-box.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EditFormComponent } from "./edit-form/edit-form.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AddBookComponent,
    ListBooksComponent,
    BookComponent,
    ContainerComponent,
    BottomContainerComponent,
    FormBookComponent,
    SearchBoxComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
