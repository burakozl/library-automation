import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Session } from 'src/app/models/session';
import { BooksService } from 'src/app/services/books.service';
import { LendBooksService } from 'src/app/services/lend-books.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {

  cartItems!:any[];
  sessionStatus!:Session;

  constructor(
    private booksService:BooksService,
    private localStorageService:LocalStorageService,
    private lendBooksService:LendBooksService,
    private sessionStatusService:SessionStatusService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getBooksFromStore();
    if(this.localStorageService.get("lendList") === null){
      this.localStorageService.set("lendList",'[]');
    }
  }

  getUserInfo() {
    this.sessionStatusService.sessionStatusModel$.subscribe((res) => {
      if(res != null) this.sessionStatus = res;
    })
  }

  getBooksFromStore(){
    this.booksService.booksCartModel$.subscribe((res) => {
      this.cartItems = res;
    });
  }

  deleteOrder(id:number,name:string){
    this.cartItems = this.cartItems.filter(item => item.id != id);
    this.booksService.deleteOneBookToStore(id);//book servisten ilgili method çalıştırıldığında store içersinden kendisine parametre olarak aldığı id'li kitabı çıkarıcak...
  }

  completeOrder(){
    this.postLendBooks();

    let lsOrder:any = localStorage.getItem('lendList');
    let oldOrder = JSON.parse(lsOrder);
    const newOrders:any = {
      userName: this.sessionStatus?.name,
      userSurname: this.sessionStatus?.surname,
      userEmail: this.sessionStatus?.email,
      bookInformation: this.cartItems.map(item => {
        return {
          ...item
        }
      })
    };
    oldOrder.push(newOrders);

    this.localStorageService.set("lendList",JSON.stringify(oldOrder));
    let ls:any = this.localStorageService.get("lendList");
    console.log(JSON.parse(ls));

    this.toastr.success("Ödünç alma işleminiz başarılı bir şekilde tamamlandı...");
    this.booksService.deleteBookToStore();//sepeti stordan silen metot
    this.router.navigateByUrl('/user-book-list');
  }

  postLendBooks() {
    this.cartItems.map((item) => {
      const lendInfo:any = {
        user_email:this.sessionStatus?.email,
        book_barcodeNumber: item.barcodeNumber,
        dateOfLend: item.fromDate,
        bookDeliveryDate: item.toDate
       }
       this.lendBooksService.createLendBooks(lendInfo).subscribe();
    });
  }

}
