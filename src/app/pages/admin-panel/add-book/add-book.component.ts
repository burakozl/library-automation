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
  url: any;
	msg = "";
  selectedFile!:File;

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

  selectFile(event:any){
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'Bir resim seçmek zorundasınız...';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Sadece resim dosyaları desteklenmektedir..";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}

  }

  addBook(){
    if(this.addBookForm.valid){
      const addBook = {
        ...this.addBookForm.value,
        imageId: this.url //image id değeri base64 olarak atanacak...
      }
      this.booksService.createBook(addBook).subscribe((res) => {
        this.router.navigateByUrl('/admin-panel');
      });
    }else{
      this.toastr.error("Lütfen tüm alanların istenilen şekilde doldurulduğundan emin olun.","Sistem Mesajı");
    }

  }
  goBack(){
    this.router.navigateByUrl('/admin-panel');
  }

}
