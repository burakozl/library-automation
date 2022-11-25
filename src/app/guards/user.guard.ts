import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { SessionStatusService } from '../services/session-status.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  sessionStatus!:Session | null;

  constructor(
    private sessionService:SessionStatusService,
    private router:Router,
    private toastr:ToastrService
    ) {
      this.sessionService.sessionStatusModel$.subscribe((res) => {
        this.sessionStatus = res;
      });
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.sessionStatus?.isLogin){//sessionStatus store içindeki islogin değeri true ise kullanıcı giriş yapmış demektir guard etkisiz
        return true;
      }else{//kullanıcı giriş yapması için logine yönlendirilir ve hata mesajı gösterirlir...guard devrede...
        this.toastr.error("Error","Bu sayfaya erişmek için giriş yapmalısınız...")
        this.router.navigateByUrl("login");
        return false;
      }
  }

}
