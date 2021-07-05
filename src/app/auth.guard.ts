import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "./services/common.service";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private cs: CommonService,private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      // console.log(this.cs.isLoggedIn());
    if (this.cs.isLoggedIn()) {
      return true;
      // check role and access permission
      // if role have permission then return true
      // else redirect to dashboard
    }else{
      this.router.navigateByUrl("/login");
    }

  }
}
