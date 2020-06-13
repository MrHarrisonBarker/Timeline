import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit
{

  accent: string = 'black';


  constructor (public auth: AuthService,private _location: Location )
  {
  }

  ngOnInit (): void
  {
  }

  public back() {
    this._location.back();
  }

}
