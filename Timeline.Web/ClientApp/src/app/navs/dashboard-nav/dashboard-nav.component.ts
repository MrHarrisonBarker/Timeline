import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AuthService} from "../../_services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {JoinTeamComponent} from "../../team/join-team/join-team.component";
import {NewComponent} from "../../team/new/new.component";

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit
{

  @Input() accent: string = 'black';

  constructor (private _location: Location, public auth: AuthService, public dialog: MatDialog)
  {
  }

  ngOnInit (): void
  {
  }

  public back ()
  {
    this._location.back();
  }

  JoinTeam ()
  {
    const joinTeamRef = this.dialog.open(JoinTeamComponent, {maxWidth: '50vw', width: '100%'});
  }

  NewTeam ()
  {
    const newTeamRef = this.dialog.open(NewComponent, {maxWidth: '50vw', width: '100%'});
  }

  JoinBoard ()
  {

  }

  super ()
  {

  }
}
