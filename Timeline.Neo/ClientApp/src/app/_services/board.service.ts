import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Board} from "../_models/board";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {WarehouseService} from "./warehouse.service";

export interface NewBoard
{
  userId: string;
  teamId: string;
  board: Board;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService
{

  private boardObservable: Observable<Board>;
  public board: Board;
  private readonly baseUrl: string;
  private readonly header: HttpHeaders;

  constructor (private authService: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private warehouse: WarehouseService)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }

  public getBoard (boardId: string): Observable<Board>
  {
    return this.http.get<Board>(this.baseUrl + 'api/board/Get', {
      headers: this.header,
      params: new HttpParams().set('BoardId', boardId)
    }).pipe(map(board =>
    {
      let teamIndex = this.warehouse.Teams.findIndex(x => x.id == board.team.id);
      let boardIndex = this.warehouse.Teams[teamIndex].boards.findIndex(x => x.id == board.id);
      if (boardIndex == -1)
      {
        this.warehouse.Teams[teamIndex].boards.push(board);
        console.log('board not in warehouse, adding', this.warehouse.Teams[teamIndex].boards);
      } else
      {
        this.warehouse.Teams[teamIndex].boards[boardIndex] = board;
        console.log('board already in warehouse, updating', this.warehouse.Teams[teamIndex].boards[boardIndex]);
      }
      return board;
    }));

  }

  public joinBoard (inviteToken: string): Observable<Board>
  {
    let newBoard = {
      userId: this.authService.User.id,
      inviteToken: inviteToken
    };

    return this.http.post<Board>(this.baseUrl + 'api/board/JoinBoard', newBoard, {headers: this.header}).pipe(map(board =>
    {
      this.warehouse.Teams[this.warehouse.Teams.findIndex(x => x.id == board.team.id)].boards.push(board);
      return board;
    }));
  }

  public createBoard (newBoard: NewBoard): Observable<Board>
  {
    return this.http.post<Board>(this.baseUrl + 'api/board/create', newBoard, {headers: this.header});
  }

  public completeBoard (id: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.baseUrl + 'api/board/complete', '', {
      headers: this.header,
      params: new HttpParams().set('BoardId', id)
    });
  }

  public deleteBoard (boardId: string, warehouseJobs: boolean): Observable<boolean>
  {
    return this.http.post<boolean>(this.baseUrl + 'api/board/delete', {warehouse: warehouseJobs}, {
      headers: this.header,
      params: new HttpParams().set('BoardId', boardId)
    });
  }

}
