import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './pages/admin-panel/add-book/add-book.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
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
    path: "admin-panel",
    component : AdminPanelComponent
  },
  {
    path: "add-book",
    component : AddBookComponent
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
