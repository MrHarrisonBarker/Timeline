import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {AuthService} from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService, private router: Router)
  {
  }

  canActivate() : Observable<boolean>
  {
    console.log('activating ... ');
    return this.authService.IsLoggedInAsync().pipe(map( logged => {
      if (logged) {
        return true
      } else {
        this.router.navigate ( [ "" ] );
        return false;
      }
    }));
  }

}
