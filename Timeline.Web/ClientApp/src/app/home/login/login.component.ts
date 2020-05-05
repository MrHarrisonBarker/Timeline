import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateUserComponent} from "../../login/create-user/create-user.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  error: boolean;
  bsModalRef: BsModalRef;

  constructor (private authService: AuthService, private router: Router,private modalService: BsModalService)
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
    this.bsModalRef = this.modalService.show(CreateUserComponent, {class: "modal-lg"});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
