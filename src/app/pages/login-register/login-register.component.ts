import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  loginForm!: FormGroup; //kullanıcı girişi için oluşturulacak formgroup
  registerForm!: FormGroup;//kullanıcı kaydı için oluşturulacak formgroup
  users!:User[];//jsondan çekilecek tüm userslar burada tutulacak...

  constructor(
    private formBuilder:FormBuilder,//angular form oluşturmak için ilgili servis
    private usersService:UsersService,// user httpreq. işlemleri için oluşturulan servis..
    private router:Router,
    private toastr:ToastrService,
    private sessionStatusService:SessionStatusService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();//userservis'e ulaşıp get isteğiyle dataları çekicek metot
    this.createLoginForm();//loginformu oluşturulacak metot sayfa ilk yüklendiğinde onInit içinde çağrılır...
    this.createRegisterForm();//registerformu oluşturulacak metot sayfa ilk yüklendiğinde onInit içinde çağrılır...
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;//dönen response'u users'a atıyoruz.
    });
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

//Giriş İşlemleri
  login(){
    if(!this.loginForm.valid){//form invalid ise toastr ile kullanıcıya hata göster
      this.toastr.error('Tüm zorunlu alanları doldurduğunuzdan emin olun...', 'Sistem mesajı :');
    }else{
      this.usersService.getUser(this.loginForm.value.email).subscribe({//userservice'den queryparams ile girilen maili içeren datayı get eder...
        next: (res) => {
          if(res.length === 0){//data yoksa length sıfır gelir.. hata göster..
            this.toastr.error("Böyle bir hesap bulunamadı...","Sistem mesajı");
          }else{//ilgili data varsa
            if(res[0].password == this.loginForm.value.password){//girilen şifre get edilen data'nın şifresi ile aynı mı?
              this.toastr.success("Başarılı bir şekilde giriş yapıldı...");
              this.saveSessionToStore(res[0]);//kullanıcı bilgileri store'a kaydedilecek...
              if(res[0].userRole === "admin"){ //userrole'e göre admin panel yada home yönlendir.
                this.router.navigateByUrl('/admin-panel');
              }else{
                this.router.navigateByUrl('/home');
              }
            }else{
              this.toastr.error("Email yada şifre hatalı...","Sistem mesajı");
            }
          }
        },
        error: (err) => {
          console.log(err);//hata varsa consola bas
        }
      })
    }
  }

  saveSessionToStore(data:User){
    const sessionInfo = {
      name: data.name,
      surname: data.surname,
      userRole: data.userRole,
      isLogin:true
    };
    this.sessionStatusService.saveSessionToStore(sessionInfo);
  }

  //Kayıt işlemleri
  register(){
    if(!this.registerForm.valid){//form invalid ise toastr ile kullanıcıya hata göster
      this.toastr.error('Tüm zorunlu alanları doldurduğunuzdan emin olun...', 'Sistem mesajı :');
    }else{
      let isUsedEmail:boolean = false; //girilen email'i kontrol etmek için oluşturulan değişken

      this.users.forEach((user:{email:string}) => {//tüm user datası gezilerek girilen emailin kontrolü yapılır
        if(this.registerForm.value.email === user.email){//eşleşen data varsa
          isUsedEmail = true;//oluşturulan değişken değeri true...
        }
      });

      if(isUsedEmail){//girilen email zaten varsa hata...
        this.toastr.error("Girmiş olduğunuz email zaten kayıtlı...","Sistem Mesajı:");
      }else{//mail users içersinde bulunmuyorsa kayıt işlemi yapılabilir...
        const newUser: User = {//register form değerleri oluşturulan obje içersine atanır...
          ...this.registerForm.value,
          userRole: "user"
        }
        this.usersService.createAccount(newUser).subscribe({//userService içersindeki createAccount metoduna ulaşılıp post işlemi yapılır..
          next: (res) => {//kullanıcıya işlem başarılı bilgisi göster...
            this.toastr.success(`Hoşgeldin ${res.name} ${res.surname}! Hesabın başarılı bir şekilde oluşturuldu...`);
          },
          error: (err) => {//hata varsa consola bas...
            console.log(err);
          },
          complete: () => {
            this.registerForm.reset();
          }
        });
      }
    }
  }

}
