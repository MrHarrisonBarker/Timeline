import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from "rxjs/operators";
import {AuthService} from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{

  private isLoggedIn: Observable<boolean> = of(false);

  constructor (private authService: AuthService, private router: Router)
  {
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    console.log('activating ... ');

    if (this.authService.User == null)
    {
      this.authService.AllReadyLogged().subscribe(isLoggedIn =>
      {
        if (isLoggedIn)
        {
          this.isLoggedIn = of(true);
          console.log(isLoggedIn);
        }

        // if (isLoggedIn)
        // {
        //   console.log('auth guard has check and is logged in using local storage');
        //   return true;
        // } else
        // {
        //   this.router.navigate([""]);
        //   return false;
        // }
      });


      this.authService.IsLoggedInAsync().pipe(map(isLoggedIn =>
      {
        console.log('piped is logged in', isLoggedIn);
      }));

      return this.authService.IsLoggedInAsync();
    }

    console.log('got this far');

    return this.authService.IsLoggedInAsync().pipe(map(isLoggedIn =>
    {
      if (isLoggedIn)
      {
        console.log('auth guard has check and is logged in');
        return true;
      } else
      {
        this.router.navigate([""]);
        return false;
      }
    }));
  }

}
