import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; //kullanıcı girişi için oluşturulacak formgroup
  registerForm!: FormGroup;//kullanıcı kaydı için oluşturulacak formgroup

  constructor(
    private formBuilder:FormBuilder,//angular form oluşturmak için ilgili servis
  ) { }

  ngOnInit(): void {
    this.createLoginForm();//loginformu oluşturulacak metot sayfa ilk yüklendiğinde onInit içinde çağrılır...
    this.createRegisterForm();//registerformu oluşturulacak metot sayfa ilk yüklendiğinde onInit içinde çağrılır...
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({//loginform inputları için başlangıç değeri ve validasyon ataması burada yapılır ayrıca burdaki key değerleri html tarafında formcontrolname için gereklidir......
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createRegisterForm() {//registerform inputları için başlangıç değeri ve validasyon ataması burada yapılır ayrıca burdaki key değerleri html tarafında formcontrolname için gereklidir...
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(){
    console.log(this.loginForm.value);
  }
  register(){
    console.log(this.registerForm.value);

  }

}
