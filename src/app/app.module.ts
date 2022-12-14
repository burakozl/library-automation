import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { StoreModule } from '@ngrx/store';
import { AppStoreState } from './store/app.state';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddBookComponent } from './pages/admin-panel/add-book/add-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditBookComponent } from './pages/admin-panel/edit-book/edit-book.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BooksCartComponent } from './pages/books-cart/books-cart.component';
import { UserBookListComponent } from './pages/user-book-list/user-book-list.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { FilterBooksPipe } from './pipes/filter-books.pipe';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { SortDirective } from './directives/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    AdminPanelComponent,
    AddBookComponent,
    EditBookComponent,
    HeaderComponent,
    FooterComponent,
    BookDetailComponent,
    BooksCartComponent,
    UserBookListComponent,
    LoadingComponent,
    FilterBooksPipe,
    FilterUserPipe,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {positionClass: 'toast-top-right'},
    ),
    StoreModule.forRoot<AppStoreState>(appReducers),
    StoreDevtoolsModule.instrument({
      autoPause: false,
    }),
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
