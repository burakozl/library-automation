import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-user-book-list',
  templateUrl: './user-book-list.component.html',
  styleUrls: ['./user-book-list.component.css']
})
export class UserBookListComponent implements OnInit {

  userBooks!:any;
  userInfo!:any;
  userOrder!:any;

  constructor(
    private localStrogeService:LocalStorageService,
    private sessionStatusService:SessionStatusService
  ) { }

  ngOnInit(): void {
    this.getUserBooks();
  }

  getUserBooks() {
    this.sessionStatusService.sessionStatusModel$.subscribe((res) => {
      if(res != null) this.userInfo = res;
    });
    let orders:any = this.localStrogeService.get('lendList');
    this.userBooks = JSON.parse(orders);
    console.log(this.userBooks);

    if(this.userBooks){
      this.userOrder = this.userBooks.filter((item:{userName:string}) => item.userName === this.userInfo.name);
    }
  }


}
