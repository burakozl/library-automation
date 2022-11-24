import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  books: Array<Book> = [];
  pageSize = 5;
  page = 13;

  constructor(
    private booksService:BooksService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe((res) => {
      this.books = res;
    })
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

}
