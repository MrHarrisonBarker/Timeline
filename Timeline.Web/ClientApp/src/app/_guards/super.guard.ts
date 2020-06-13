import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../_services/auth.service";
import {UserType} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class SuperGuard implements CanActivate
{

  constructor (private authService: AuthService, private router: Router)
  {
  }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log('checking if admin');
    let isSuper = this.authService.User.type == UserType.SuperAdmin;
    console.log('is Super', isSuper);
    return isSuper;
  }

}
