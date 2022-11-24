import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './pages/admin-panel/add-book/add-book.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { EditBookComponent } from './pages/admin-panel/edit-book/edit-book.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo : 'home'
  },
  {
    path: "home",
    component : HomeComponent
  },
  {
    path: "book-detail/:id",
    component : BookDetailComponent
  },
  {
    path: "admin-panel",
    component : AdminPanelComponent
  },
  {
    path: "add-book",
    component : AddBookComponent
  },
  {
    path: "edit-book/:id",
    component : EditBookComponent
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
