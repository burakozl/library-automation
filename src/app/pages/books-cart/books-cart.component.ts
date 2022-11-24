import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {

  cartItems!:any[];

  constructor(
    private booksService:BooksService
  ) { }

  ngOnInit(): void {
    this.getBooksFromStore();
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
  }

}
