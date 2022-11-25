import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AddBookComponent } from './pages/admin-panel/add-book/add-book.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { EditBookComponent } from './pages/admin-panel/edit-book/edit-book.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BooksCartComponent } from './pages/books-cart/books-cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { UserBookListComponent } from './pages/user-book-list/user-book-list.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo : 'home',
  },
  {
    path: "home",
    component : HomeComponent,
    canActivate:[UserGuard]
  },
  {
    path: "book-detail/:id",
    component : BookDetailComponent,
    canActivate:[UserGuard]
  },
  {
    path: "books-cart",
    component : BooksCartComponent,
    canActivate:[UserGuard]
  },
  {
    path: "user-book-list",
    component : UserBookListComponent,
    canActivate:[UserGuard]
  },
  {
    path: "admin-panel",
    component : AdminPanelComponent,
    canActivate:[AdminGuard]
  },
  {
    path: "add-book",
    component : AddBookComponent,
    canActivate:[AdminGuard]
  },
  {
    path: "edit-book/:id",
    component : EditBookComponent,
    canActivate:[AdminGuard]
  },
  {
    path: "login",
    component : LoginRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
