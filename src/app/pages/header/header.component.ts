import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Session } from 'src/app/models/session';
import { BooksService } from 'src/app/services/books.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sessionStatus!:Session | null;
  enteredSearchValue:string = '';
  clickedCategory:string = 'all';

  cartItems!:Book[];

  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private sessionStatusService:SessionStatusService,
    private router:Router,
    private dataTransferService:DataTransferService,//oluşturulan servis'e yakaladığı değeri göndericek...
    private booksService:BooksService
  ) { }

  ngOnInit(): void {
    this.sessionStatusProcess();
    this.booksService.booksCartModel$.subscribe((res) => {
      this.cartItems = res;
    });
  }

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue)
  }

  sessionStatusProcess() {
    this.sessionStatusService.sessionStatusModel$.subscribe((res) => {
      this.sessionStatus = res;
    })
  }

  showCategory(categoryName:string){
    this.dataTransferService.sendData(categoryName);
    this.clickedCategory = categoryName;
  }

  login(){//navbarda bulunnan giriş yap butonu burayı teikler...
    this.router.navigateByUrl('/login');//login page yönlendir..
  }
  logout(){//navbarda bulunnan dropdown içersindeki çıkış yap butonu burayı teikler...
    this.sessionStatusService.deleteSessionFromStore();//store'da sessionı temizle
    this.router.navigateByUrl('/login');//login page yönlendir...
  }

}
