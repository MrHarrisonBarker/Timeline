import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AuthService} from "../../_services/auth.service";
import {Team} from "../../_models/team";
import {NewComponent} from "../../team/new/new.component";
import {MatDialog} from "@angular/material/dialog";
import {NewBoardComponent} from "../../team/board/new-board/new-board.component";
import {Router} from "@angular/router";
import {Board} from "../../_models/board";
import {TeamService} from "../../_services/team.service";

@Component({
  selector: 'app-team-nav',
  templateUrl: './team-nav.component.html',
  styleUrls: ['./team-nav.component.css']
})
export class TeamNavComponent implements OnInit
{

  @Input() accent: string = 'black';
  @Input() team: Team;

  constructor (private _location: Location, public auth: AuthService, public dialog: MatDialog, private router: Router,public teamService: TeamService)
  {
  }

  ngOnInit (): void
  {
    console.log('team nav', this.team);
  }

  public back ()
  {
    this._location.back();
  }

  newBoard ()
  {
    const newBoardRef = this.dialog.open(NewBoardComponent, {maxWidth: '50vw', width: '100%'});
  }

  config ()
  {
    // this.router.navigateByUrl(`team/${this.team.id}/config`);
    this.router.navigate(['/team', this.team.id, 'config']);
  }

  vault ()
  {
    this.router.navigate(['/team', this.team.id, 'vault']);
  }

  audit ()
  {
    this.router.navigate(['/team', this.team.id, 'audit']);
  }

  users ()
  {
    this.router.navigate(['/team', this.team.id, 'users']);
  }

  goToBord (board: string)
  {
    this.router.navigate(['/team', this.team.id, 'board', board]);
  }

  progress ()
  {
    console.log('goiung ot progreess');
    this.router.navigate(['/team', this.team.id, 'progress']);
  }

  dashboard ()
  {
    this.router.navigate(['/dashboard']);
  }

  backlog ()
  {
    this.router.navigate(['/team',this.team.id, 'backlog']);
  }
}
