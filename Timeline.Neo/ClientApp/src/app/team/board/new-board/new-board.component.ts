import {Component, OnInit} from '@angular/core';
import {BoardService, NewBoard} from "../../../_services/board.service";
import {Board} from "../../../_models/board";
import {AuthService} from "../../../_services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../../_services/team.service";
import {WarehouseService} from "../../../_services/warehouse.service";

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent implements OnInit
{

  constructor (private boardService: BoardService, private auth: AuthService, private route: ActivatedRoute, private warehouse: WarehouseService)
  {
  }

  ngOnInit (): void
  {
  }

  newBoard (name: string, avatar: string, accent: string, description: string)
  {
    // let board: Board = {
    //   accent: accent,
    //   name: name,
    //   avatar: avatar,
    //   description: description,
    //
    // };
    //
    // let newBoard: NewBoard = {
    //   board: board,
    //   teamId: this.warehouse.CurrentTeamId,
    //   userId: this.auth.User.id
    // };
    //
    // this.boardService.createBoard(newBoard).subscribe(board =>
    // {
    //   console.log('new board from server', board);
    //   this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].boards.push(board);
    // });
  }
}
