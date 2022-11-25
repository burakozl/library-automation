import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  startLoading(){
    this.isLoadingSubject.next(true);
  }

  stopLoading(){
    this.isLoadingSubject.next(false);
  }
}
