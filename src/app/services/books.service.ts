import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { AppStoreState } from '../store/app.state';
import { deleteBooksCartModel, deleteOneBookCartModel, setBooksCartModel } from '../store/booksCart/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private controllerUrl = `${environment.apiUrl}/books`;

  booksCartModel$:Observable<Book[]>;

  constructor(
    private httpClient:HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.booksCartModel$ = this.store.select( //Store'dan booksCartModel'ı alıyoruz
      (state) => state.cart.booksCartModel
    );
   }

  createBook(book:Book): Observable<Book>{
    return this.httpClient.post<Book>(`${this.controllerUrl}`,book);
  }

  getBooks(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.controllerUrl}`);
  }

  getBook(bookId:number): Observable<Book>{
    return this.httpClient.get<Book>(`${this.controllerUrl}/${bookId}`);//gelen id'ye göre kitabı get et...
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.controllerUrl}/${book.id}`,book);
  }

  delete(bookId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${bookId}`);
  }

  saveBookToStore(booksCart: Book) {
    this.store.dispatch(setBooksCartModel( {booksCart}));
  }

  deleteOneBookToStore(id:number) {
    this.store.dispatch(deleteOneBookCartModel({id}));
  }

  deleteBookToStore() {
    this.store.dispatch(deleteBooksCartModel());
  }
}
