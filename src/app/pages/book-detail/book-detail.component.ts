import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookId!:number;
  book!:Book;

  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate;
	toDate: NgbDate | null = null;
  convertedtoDate!:string;

  constructor(
    private booksService:BooksService,
    private route:ActivatedRoute, //ilgili id'yi yakalamak için faydalanılacak...
    private calendar: NgbCalendar,
    private toastr:ToastrService
  ) {
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));//activated route ile id'yi yakala... string geldiği için number ile tipini number'a çevir.
    this.getBook(this.bookId);//istek yapılacak metot.
  }

  getBook(id:number) {
    this.booksService.getBook(id).subscribe((res) => {//book serviceden ilgili json'a get isteği atıp ürünü getir.
      if(res != null){
        this.book = res; //dönen response'u oluşturulan değişkene ata
      }
    });
  }

//-- ng-bootstrap date methods --
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
//-- ng-bootstrap date methods end--

  addToCart(){
    let fromDate = Object.values(this.fromDate);
    let convertedfromDate = `${fromDate[2]}.${fromDate[1]}.${fromDate[0]}`
    console.log(convertedfromDate);
    if(this.toDate != null){
      let toDate:any[] = Object.values(this.toDate);
      this.convertedtoDate = `${toDate[2]}.${toDate[1]}.${toDate[0]}`;
    }else{
      this.toastr.info("Ödünç alma işlemi için tarih aralığı seçin...");
      return;
    }

    const book:any = {
      ...this.book,
      fromDate: convertedfromDate,
      toDate: this.convertedtoDate
    }
    this.booksService.saveBookToStore(book);
    this.toastr.success("Kitap sepete eklendi...");
  }

}
