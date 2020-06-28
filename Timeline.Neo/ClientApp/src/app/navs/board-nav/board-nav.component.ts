import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AuthService} from "../../_services/auth.service";
import {TeamService} from "../../_services/team.service";
import {BoardService} from "../../_services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseService} from "../../_services/warehouse.service";

@Component({
  selector: 'app-board-nav',
  templateUrl: './board-nav.component.html',
  styleUrls: ['./board-nav.component.css']
})
export class BoardNavComponent implements OnInit
{

  @Input() accent: string = 'black';

  TeamId: string;
  BoardId: string;

  constructor (private _location: Location, public auth: AuthService, private boardService: BoardService, private router: Router, public warehouse: WarehouseService,private route: ActivatedRoute,)
  {
    this.TeamId = this.route.snapshot.paramMap.get('teamId');
    this.BoardId = this.route.snapshot.paramMap.get('boardId');
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
    this.router.navigateByUrl(`team/${this.warehouse.CurrentTeamId}/board/${this.boardService.board.id}/config`);
  }

  progress ()
  {
    this.router.navigateByUrl(`team/${this.warehouse.CurrentTeamId}/board/${this.BoardId}/progress`);
  }
}
