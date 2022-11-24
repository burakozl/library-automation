import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }
  private subject = new Subject<string>();//oluşturlan subject ile değişkene subscribaolup sürekli dinleme sağlanır...

    sendData(message: string) {
        this.subject.next(message);//gelen değeri değişkene ata
    }

    getData(): Observable<string> {
      return this.subject.asObservable();//değişkeni istenilen yere return et...
    }

}
