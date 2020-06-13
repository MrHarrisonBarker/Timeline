import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AuthService} from "../../_services/auth.service";
import {TeamService} from "../../_services/team.service";
import {BoardService} from "../../_services/board.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-nav',
  templateUrl: './board-nav.component.html',
  styleUrls: ['./board-nav.component.css']
})
export class BoardNavComponent implements OnInit
{

  @Input() accent: string = 'black';

  constructor (private _location: Location, public auth: AuthService, private teamService: TeamService, private boardService: BoardService, private router: Router)
  {
  }

  ngOnInit (): void
  {
  }

  public back ()
  {
    this._location.back();
  }

  config ()
  {
    this.router.navigateByUrl(`team/${this.teamService.team.id}/board/${this.boardService.board.id}/config`);
  }
}
