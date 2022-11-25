import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LendBooks } from '../models/lendBooks';

@Injectable({
  providedIn: 'root'
})
export class LendBooksService {
  private controllerUrl = `${environment.apiUrl}/lendBooks`;


  constructor(
    private httpClient:HttpClient
  ) { }

  createLendBooks(book:LendBooks): Observable<LendBooks>{
    return this.httpClient.post<LendBooks>(`${this.controllerUrl}`,book);
  }

  getLendBooks(): Observable<LendBooks[]>{
    return this.httpClient.get<LendBooks[]>(`${this.controllerUrl}`);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }

}
