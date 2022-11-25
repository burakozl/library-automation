import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { LendBooks } from 'src/app/models/lendBooks';
import { BooksService } from 'src/app/services/books.service';
import { LendBooksService } from 'src/app/services/lend-books.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  books: Array<Book> = [];
  lendBooks!:LendBooks[];
  isClickBookList:boolean = true; // default olarak kitap listesi gösterilecek
  pageTitle:string = "Kitap Listesi";
  pageSize = 5;
  page = 13;

  constructor(
    private booksService:BooksService,
    private lendBooksService:LendBooksService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.getLendBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe((res) => {
      this.books = res;
    })
  }

  getLendBooks(){
    this.lendBooksService.getLendBooks().subscribe((res) => {
      this.lendBooks = res;
    })
  }


  bookList(){
    this.isClickBookList = true;
    this.pageTitle = "Kitap Listesi";
  }


  userBorrowedBooksList(){
    this.isClickBookList = false;
    this.pageTitle = "Kullanıcı Ödünç Listesi";
  }

  delete(id:number,name:string){
    if (confirm(`(${name}) isimli kitabı silmek istediğinizden eminmisiniz?`) == true){
      this.booksService.delete(id).subscribe({
        next: () => {

        },
        error: (err) => {
          this.toastr.error(err.message,"Hata");
        },
        complete: () => {
          this.toastr.success(`(${name}) isimli kitap başarılı bir şekilde silindi...`);
          this.getBooks();
        },
      });
    }else {
      this.toastr.info(`İşlem iptal edildi...`,"Sistem Mesajı");
    }
  }

  receiveTheBook(id:number){
    this.lendBooksService.delete(id).subscribe();
    this.toastr.success("Teslim alma işleminiz başarılı bir şekilde tamamlandı...");
    this.getLendBooks();
  }

}
