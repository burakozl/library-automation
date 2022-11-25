import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { SessionStatusService } from '../services/session-status.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

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
      if(this.sessionStatus?.userRole === 'admin'){//sessionStatus store içindeki userRole değeri admin ise admin giriş yapmış demektir guard etkisiz
        return true;
      }else{
        this.toastr.error("Error","Bu sayfaya erişmek için yönetici olarak giriş yapmalısınız...")
        this.router.navigateByUrl("/login");
        return false;
      }
  }

}
