import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private controllerUrl = `${environment.apiUrl}/books`;

  constructor(
    private httpClient:HttpClient
  ) { }

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
}
