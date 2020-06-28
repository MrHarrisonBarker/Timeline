import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {CreateUserComponent} from "./create-user/create-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  public error: boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('');

  constructor (private authService: AuthService, private router: Router,public dialog: MatDialog)
  {
  }

  ngOnInit (): void
  {
  }

  login (email: string, password: string)
  {
    if (email != '' && password != '')
    {
      console.log('logging user in', email);
      this.authService.AuthenticateUser({email: email, password: password}).subscribe(loggedIn =>
      {
        if (loggedIn) {
          console.log('authed user');
          this.router.navigate(['dashboard']);
        } else {
          this.error = true;
          console.log('Error');
        }
      });
    } else {
      this.error = true;
    }
  }

  create ()
  {
    const dialogRef = this.dialog.open(CreateUserComponent);
  }
}
