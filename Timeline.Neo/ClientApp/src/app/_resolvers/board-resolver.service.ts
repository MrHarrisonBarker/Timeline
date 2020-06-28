import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Board} from "../_models/board";
import {BoardService} from "../_services/board.service";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BoardResolverService implements Resolve<Board>
{

  constructor (private boardService: BoardService)
  {
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board> | Promise<Board> | Board
  {
    return this.boardService.getBoard(route.paramMap.get('boardId')).pipe(catchError(err =>
    {
      console.log('board error', err);
      return EMPTY;
    }));
  }
}
