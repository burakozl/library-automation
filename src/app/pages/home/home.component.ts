import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { LendBooks } from 'src/app/models/lendBooks';
import { BooksService } from 'src/app/services/books.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { LendBooksService } from 'src/app/services/lend-books.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books!:Book[];
  searchText:string = '';
  categaryName:string = 'all';
  isLoading!:boolean;
  novelBooks!:Book[];
  childBooks!:Book[];
  lendBooks!:any[];
  notAvailableBooks!:any[];
  isAvailable!:boolean[];

  constructor(
    private bookService:BooksService,
    private loadingService:LoadingService,
    private lendBooksService:LendBooksService,
    private dataTransferService:DataTransferService//categoriyi yakalayacağımız service import et...
  ) {
    this.dataTransferService.getData().subscribe(x => {
      this.categaryName = x;//service içersinde yakaladığımız değeri oluşturduğumuz değişkene atar.
      this.getBooksByCategory();
    });
   }

  ngOnInit(): void {
    this.isPageLoading();
    this.loading();
    this.getBooks();
  }

  isPageLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  loading() {
    if (this.books) {
      this.loadingService.stopLoading();

    } else {
      this.loadingService.startLoading();
    }
  }

  getBooks() {
    this.bookService.getBooks().subscribe((res) => {
      this.books = res;
      if(res.length > 0){
        this.getBooksByCategory();
        this.getLendBooks();
      }
    });
  }

  getLendBooks(){
    this.lendBooksService.getLendBooks().subscribe((res) => {
      if(res != null) this.lendBooks = res;
     console.log(filterByReference(this.books, this.lendBooks));
     this.notAvailableBooks = filterByReference(this.books, this.lendBooks);

     this.isAvailable = this.books.map((item) => {
      return this.notAvailableBooks.find((book) => item.barcodeNumber === book.barcodeNumber)
     });

    });


    const filterByReference:any = (arr1:any, arr2:any) => {
      let result = [];
      result = arr1.filter((el:any) => {
         return arr2.find((element:any) => {
            return element.book_barcodeNumber === el.barcodeNumber;
         });
      });
      return result;
   }



  }

  getBooksByCategory(){
      this.novelBooks = this.books.filter(item => item.category.toLocaleLowerCase() === 'roman');
        //console.log(this.novelBooks);
      this.childBooks = this.books.filter(item => item.category.toLocaleLowerCase() === 'çocuk');
        //console.log(this.childBooks);
  }

  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue;
   //console.log(this.searchText);
  }

}
