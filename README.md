# LibraryAutomation
- [İçindekiler](#içindekiler)
- [Giriş](#giriş)
- [Kurulum](#kurulum)
- [Login Page](#login-page)
- [Home Page](#home-page)
- [Book Detail Page](#book-detail-page)
- [Books Cart Page](#books-cart-page)
- [User Book List Page](#user-book-list-page)
- [Admin Panel Page](#admin-panel-page)
- [Add Book Page](#add-book-page)
- [Edit Book Page](#edit-book-page)
- [Angular Default Readme](#angular-default-reame)

# Giriş
  Etiya case kapasamında hazırlamış olduğum kütüphane otomasyon uygulaması... Bu projeyi hazırlarken yeni şeyler öğrendim ve bilgilerimi tazeledim.Projenin çalıştırılmasından başlıyarak sayfa sayfa neler yaptığımı maddeler şeklinde bu dökümanda bulabilirsiniz.

# Kurulum
Angular için gerekli kurulum işlemlerini tamamladıktan sonra:
- [Projeyi](https://github.com/burakozl/library-automation/archive/refs/heads/master.zip) indirdirerek yada [https://github.com/burakozl/library-automation.git](https://github.com/burakozl/library-automation.git) linkini clone'luyarak projeyi bilgisayarınıza aktardıktan sonra gerekli paketleri yüklemek için terminalden **`npm install`** diyerek gerekli paketleri içeren node_modules klasörünü oluşturunuz.
- Bu projede kullanmış olduğum json-server paketini çalıştımak için yine terminalden **`json-server --watch api/db.json`** komutunu çalıştırınız.(**NOT: Bu komutun çalıştığı terminal açık kalmalı ve proje çalıştığı sürece sonlandırılmamalı `http://localhost:3000/` 'e giderek ilgili json dosyalarını gördüğünüzden emin olun...**)
- Son olarak yeni bir terminal açarak **`ng serve`** komutu ile projeyi başlatınız.

# Login Page
Proje başlarken tüm sayfalar Guard'lar ile korunduğu için kullanıcı router ile login sayfasına yönlendirilir.Bu sayfada bulunan Giriş yap ve Kayıt ol radio butonları için query params ile geçişler sağlandı.'**/login?tabs=sign-in**' ve '**/login?tabs=sign-up**' şeklinde.
- **Giriş Yap**
  - Giriş Yap butonu altında kullanıcıdan email ve şifre bilgilerini girmesini istediği bir reactive form yapısı bulunmakta burada gerekli validasyon işlemleri yapıldı ek olarak kullanıcı daha önce oluşturulmamış bir hesapla giriş yaparsa toastr ile '**Böyle bir hesap bulunamadı...**' hatası verilmektedir ayrıca email doğru fakat şifre hatalı ise yine toastr ile '**Email yada şifre hatalı...**' mesajı verilmektedir.
  - Gerekli bilgiler oluşturulan users adındaki json dosyasındaki kullanıcı bilgileri ile eşleşiyorsa ve kullanıcı userRole'ü 'user' ise '/home' sayfasına, 'admin' ise '/admin-panel' safasına yönlendirilir ve toastr ile 'Başarılı bir şekilde giriş yapıldı' mesajı gösterilir.
  - Kulanıcı başarılı şekilde giriş yaptıktan sonra ngrx ile oluşturulan sessionStatus storuna kullanıcı bilgileri kayıt edilir ve burda tutulan oturum bilgilerine daha sonra ihitiyaç duyan diğer componentler ulaşarak kullanıcaktır. 

- **Kayıt Ol**
  - Kayıt Ol butonu altında kullanıcının yeni bir hesap oluşturması için gerekli alanlar bulunmaktadır burada yine reactive form yapısı kullanıldı ve inputlar için validasyonlar yapıldı.
  -Kullanıcı daha önceden alınmış bir mail adresi ile hesap oluşturmaya çalışırsa toastr ile 'Girmiş olduğunuz email zaten kayıtlı...' hata mesajı verilerek başka bir mail girmesi istenmektedir ayrıca form valid değilse yine hata mesajı gösterilir ve **kayıt işlemi gerçekleşmez**
  -Tüm şartlar sağlandıktan sonra ilgili yeni kullanıcı bilgileri post edilerek users altına kayıt edilir ve kullanıcı '/home' sayfasına yönlendirilir.
- **Staging Area**
  - **Git** tarafından **takip edilen** dosyalar burada bulunur. Gerçek manada **fiziki bir alan değildir**. Dosyalarımızın durumunu belirten hayali bir ortam olarak düşünebiliriz. 
- **Commit**
  - Kısaca **Taahhüt** veya **Sözleşme** diyebiliriz. Bir dosyada yaptığımız değişikliklerin kalıcı değişiklikler olduğunun taahhüdünü vermemiz, sözleşmeyi imzalamamız gerekmektedir. Böyle ilgili dosya/dizinde yaptığımız değişiklikler **repository**'mize kaydedilir.

Oluşturulan örnek admin hesabı :
  - Email: admin@etiya.com
  - Şifre: admin123

# Home Page
  - Header:
    - Header kısmında navbar ve navbarın altında logo searchbar, ödünç alınacak kitapların sepeti ve kitap kategorileri bulunmaktadır.
    - Navbarda en sağda giriş yapan kullanıcının adı soyadı store'dan çekilerek gösterilir dropdown olan bu alana kullanıcı tıkladığında kullanıcıya özel olan ödünç listem ve çıkış yap seçenekleri bulunmaktadır.Kullanıcı admin ise ngIf yardımıyla ödünç listem admim panel olarak değişir.
    - Headerda bulunan searchbar ile content içersindeki kitapların başlıklarına göre arama yapılabilir arama işlemi için include kullanıldığı için başlığın girilen değeri içermesi eşleşmesi için yeterlidir.
    - Serarchbar'ın sağında bulunan ödünç yazan kısım kullanıcının sepetini temsil etmektedir sepete ekleme işlemleri dinamik olarak ngrx yardımıyla burayı güncellemektedir.
    - Yine Headerda sol altda bulunan kategoriler ise kullanıcının kategoriye göre filtreleme yapmasını sağlar.
  - Content:
    - Sayfa içeriğinde books json dosyasında bulunan kitap bilgileri http get isteği ile çekilerek oluşturulan dizi değişkenine atanır ve kartlar *ngFor kullanılarak ekrana basılır.
    -Kart içersinde kitap resmi açıklaması ve detay butonu bulunmaktadır kullanıcı hem detay butonuna basarak hemde ilgili kartın herhangi bir yerine basarak ilgili kitabın detay sayfasına '/book-detail/id' ulaşabilir..
    -Daha önceden başka kullanıcılar tarafından ödünç alınmış kitaplar varsa ilgili kitabın bulunduğu kart pasife alınır ve üzerinde 'Müsait Değil' etiketi gösterilir.

# Book Detail Page
- Bu sayfada activated route kullanılarak tıklanan kartın id'si yakalanarak books/id get işlemi yapılarak ilgili kitap http get isteğiyle alınır.
- İlgili kitap bilgileri bu sayfada detaylı şekilde gösterilir.
- Kullanıcı kitabı ödünç alıcağı tarih aralığını seçtiktikden sonra sepete ekle butonuna basarak ilgili kitabı sepetine ekleyebilir.
- Sepete ekle butonuna tıklandığında click event'ı ngrx ile oluşturulan cart store içersine kitap bilgilerini kayıteder ve sepet componenti bu dataya ulaşarak dinamik olarak güncellenir.
  
# Books Cart Page
- Kullanıcı sepetine tıklayarak bu sayfaya ulaşır.
- Bu sayfada sepete eklediği kitapları tablo şeklinde görür çıkarmak istediği kitap olursa tablonun en sağında bulunan çöp kutusu iconuna basarak sepetinden silebilir.
- Ödünç al butonuna tıkladığında deleteBooksCartModel action'ı tetiklenerek cart store içersinde bulunan data silinir bu şekilde sepet boşaltılır ve kullanıcı '/user-book-list' sayfasına yönlendirilir ayrıca lendBooks json dosyasına ödünç alan kullanıcı maili ile ödünç alınan kitabın barkod numarası, ödünç alma tarihi ve teslim tarihi bilgileri http post isteğiyle kayıt edilir.
  
# User Book List Page
- Kullanıcı bu sayfada ödünç almış olduğu kitapların listesini tablo şeklinde görür.

# Admin Panel Page
- Bu sayfaya sadece userRole'ü admin olan kullanıcılar erişebilir.
- Sol üste bulunan kullanıcı sayfasına geç butonuna basarak home page'e geçebilir.
- Bu sayfada kullanıcıyı kitapların listesi olan bir tablo karşılar dilerse kullanıcı ödünç listesine basarak ilgili tabloyada ulaşabilir.
- Sağda bulunan input ile Kitap adına göre filtreleme yapabilir.
- Kitap listesi içersinde thead'de bulunan kitap ekle butonuna basarak yeni kitap ekleyebileceği sayfaya geçiş yapar.('/add-book').
- Yine mevcut tabloda her kitabın en sağında bulunan iconlera tıklayarak silme veya düzenleme('/edit-book/id' yönlendirir) işlemlerinide yapabilir.
- Kullanıcı ödünç listesinde yine kullanıcıların ödünç almış oldukları kitapların gerekli bilgilerini ve ödünç alan kullanıcın mail adresini lendBooks jsondan get edilen data ile tabloda gösterilir.
- Bu tabloda teslim tarihi geçen kitalar kırmızı renkte geçmeyenler ise yeşil renkte gösterildi.
- Kullanıcı dilerse yine bu tabloda en sağda bulunan teslim al iconuna basarak ilgili kitabın datasını lendBooks'dan silmiş olur ve kitabı tekrar ödünç alınabilir hale getirir.
-Sağda bulunan input ile kullanıcı mail adresine göre filtreleme yapabilir.
- Her iki tablonunda bellirli thead'lerine tıklayarak sort işlemi yapılabilir.
- ng-pagination npm paketi kullanılarak datalar 5'erli olucak şekilde sayfalandırıldı.

# Add Book Page
- Bu sayfada kullanıcı gerekli bilgileri girerek yeni bir kitap ekleyebilir.
- Bu sayfada yine kullanıcı kitap resmi'de ekleyebilir burada eklenen resmin base64 değeri books json'da bulunan imageId key'ine value olarak post edilir.
- Form alanları istenilen şekilde doldurulduktan sonra kullanıcı Kitap Ekle butonuna basarak tetiklemiş olduğu event ile books json içersine girmiş olduğu form değerlerini post etmiş olur.
- Geri butonuna basarsa '/admin-panel' sayfasına yönlendirilir.

# Edit Book Page
- Kullanıcı düzenlemek istediği kitabın edit iconuna tıkladığında bu sayfaya yönlendirilir.
- Burada yine activated route ile id yakalanır ve tıklanan kitabın bilgileri get edilir.
- Getirilen data ilgili form alanlarında gösterilir.
- Kullanıcı düzenleme işlemini tamamladıktan sonra Kitap Güncelle butonuna tıklayarak submit ettiği form değerlerini ilgili kitabın bulunduğu alanı http put isteğiyle güncellemiş olur.
- Geri butonuna tıklayar admin-panel ' dönebilir.


# Angular Default Readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
