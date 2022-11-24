import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book!:Book;
  bookId!:number;
  editBookForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private booksService:BooksService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router
  ) {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));//activated route ile id'yi yakala... string geldiği için number ile tipini number'a çevir.
  }

  ngOnInit(): void {
    this.getBook(this.bookId);
  }

  getBook(id:number) {
    this.booksService.getBook(id).subscribe((res) => {
      if(res != null){
        this.book = res;
      }
      this.createEditBookForm();
    })
  }

  createEditBookForm() {
    this.editBookForm = this.formBuilder.group({
      bookName: [this.book?.bookName ?? '', Validators.required],
      author: [this.book?.author ?? '', Validators.required],
      aboutTheBook: [this.book?.aboutTheBook ?? '',Validators.required],
      barcodeNumber: [this.book?.barcodeNumber ?? '',Validators.required],
      shelfNumber: [this.book?.shelfNumber ?? '',Validators.required],
      category: [this.book?.category ?? '',Validators.required],
      imageId: [this.book?.imageId ?? '',Validators.required],
    })
  }

  updateBook(){
    if(this.editBookForm.invalid){
      this.toastr.error("Lütfen tüm alanların istenilen şekilde doldurulduğundan emin olun.","Sistem Mesajı");
      return;
    }
    const editedBook:Book = {
      ...this.editBookForm.value,
      id: this.bookId
    }
    this.booksService.updateBook(editedBook).subscribe({
      next: (res) => {
        this.toastr.success(`(${res.id}) id'li kitap başarılı bir şekilde güncellendi...`);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message,"Hata:");
      },
      complete: () => {
        this.router.navigateByUrl('/admin-panel');
      },
    })

  }

}
