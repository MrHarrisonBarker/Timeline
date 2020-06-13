import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {User, UserType} from "../../_models/user";
import {Router} from "@angular/router";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit
{

  error: any;

  constructor (private authService: AuthService, private bsModalRef: BsModalRef, private router: Router)
  {
  }

  ngOnInit (): void
  {
  }

  create (email: string, password: string, avatar: string, displayName: string, firstName: string, lastName: string)
  {
    let user: User = {
      email: email,
      password: password,
      avatarUrl: avatar,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      type: UserType.Regular
    };

    this.authService.createUser(user).subscribe(user =>
    {
      console.log(user);
      if (user)
      {
        this.authService.AuthenticateUser({email: email, password: password}).subscribe((loggedIn) =>
        {
          if (loggedIn) {
            console.log('authed user');
            this.router.navigate(['dashboard']);
            this.bsModalRef.hide();
          } else {
            this.error = true;
            console.log('Error');
          }
        });
      }
    });
  }
}
