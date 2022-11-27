import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { LendBooks } from 'src/app/models/lendBooks';
import { BooksService } from 'src/app/services/books.service';
import { LendBooksService } from 'src/app/services/lend-books.service';
import { LoadingService } from 'src/app/services/loading.service';

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
  isLoading!: boolean;
  searchText!:string;
  isOutOfDate!:boolean[];
  placeholder:string = "Kitap ara..."
  pageSize = 5;
  page = 13;

  constructor(
    private booksService:BooksService,
    private lendBooksService:LendBooksService,
    private loadingService: LoadingService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.isPageLoading();
    this.loading();
    this.getBooks();
    this.getLendBooks();
  }

  isPageLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  loading() {
    if (this.books.length > 0) {
      this.loadingService.stopLoading();
    } else {
      this.loadingService.startLoading();
    }
  }

  getBooks() {
    this.booksService.getBooks().subscribe((res) => {
        this.books = res;
    })
  }

  getLendBooks(){
    this.lendBooksService.getLendBooks().subscribe((res) => {
      if(res != null) this.lendBooks = res;
      this.compareTheDates();
    })
  }

  compareTheDates(){//bugünün tarihi ile teslim tarihleri kıyaslanır teslim tarihi geçenler ngstyle ile kırmızı renkte gösterilecek..
    this.isOutOfDate = this.lendBooks.map((item) => {
      let convertDate = item.bookDeliveryDate.split('.');
      let day = convertDate[0];
      let mounth = convertDate[1];
      let year = convertDate[2];
      let date = `${mounth}.${day}.${year}`
      let today = new Date();
      if(today > new Date(date)){
        return true;
      }else{
        return false;
      }
    });
  }


  bookList(){
    this.isClickBookList = true;
    this.pageTitle = "Kitap Listesi";
    this.placeholder = "Kitap ara..."
  }


  userBorrowedBooksList(){
    this.isClickBookList = false;
    this.pageTitle = "Kullanıcı Ödünç Listesi";
    this.placeholder = "Kulanıcı mail ara..."
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
