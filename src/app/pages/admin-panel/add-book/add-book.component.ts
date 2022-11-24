import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private booksService:BooksService,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createaddBookForm();
  }

  createaddBookForm() {
    this.addBookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      author: ['', Validators.required],
      aboutTheBook: ['',Validators.required],
      barcodeNumber: [
        Math.floor(1000000000 + Math.random() * 9000000000),
        Validators.required
      ],
      shelfNumber: ['',Validators.required],
      category: ['',Validators.required],
      imageId: ['',Validators.required],
    })
  }


  addBook(){
    if(this.addBookForm.valid){
      this.booksService.createBook(this.addBookForm.value).subscribe((res) => {
        this.router.navigateByUrl('/admin-panel');
      });
    }else{
      this.toastr.error("Lütfen tüm alanların istenilen şekilde doldurulduğundan emin olun.","Sistem Mesajı");
    }

  }

}
