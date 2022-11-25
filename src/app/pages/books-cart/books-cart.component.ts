import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Session } from 'src/app/models/session';
import { BooksService } from 'src/app/services/books.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {

  cartItems!:any[];
  sessionStatus!:Session | null;

  constructor(
    private booksService:BooksService,
    private localStorageService:LocalStorageService,
    private sessionStatusService:SessionStatusService,
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
      this.sessionStatus = res;
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
    let lsOrder:any = localStorage.getItem('lendList');
    let oldOrder = JSON.parse(lsOrder);
    const newOrders:any = {
      userName: this.sessionStatus?.name,
      userSurname: this.sessionStatus?.surname,
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
    this.booksService.deleteBookToStore();
  }

}
