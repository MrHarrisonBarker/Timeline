import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {User} from "../_models/user";
import {Observable} from "rxjs";
import {AuthService} from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(private authService: AuthService) { }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User
  {
    return this.authService.
  }
}
