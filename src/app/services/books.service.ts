import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  createBook(book:Book){
    return this.httpClient.post<Book>(`${this.controllerUrl}`,book);
  }

  getBooks(){
    return this.httpClient.get<Book[]>(`${this.controllerUrl}`);
  }

  getBook(barcodeNumber:number){
    return this.httpClient.get<Book[]>(`${this.controllerUrl}?barcodeNumber=`+barcodeNumber);//query param ile varsa ilgili Book get et...
  }
}
