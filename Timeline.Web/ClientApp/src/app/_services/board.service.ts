import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Board} from "../_models/board";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

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

  constructor (private authService: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }

  public getBoard (boardId: string): Observable<Board>
  {
    this.boardObservable = this.http.get<Board>(this.baseUrl + 'api/board/GetBoard', {
      headers: this.header,
      params: new HttpParams().set('BoardId', boardId)
    }).pipe(map(board =>
    {
      console.log('pipe board', board);
      this.board = board;
      return board;
    }));

    return this.BoardAsync();
  }

  public BoardAsync (): Observable<Board>
  {
    return this.boardObservable;
  }

  public joinBoard (inviteToken: string): Observable<Board>
  {
    let newBoard = {
      userId: this.authService.User.id,
      inviteToken: inviteToken
    };

    return this.http.post<Board>(this.baseUrl + 'api/board/JoinBoard', newBoard, {headers: this.header}).pipe(map(board =>
    {
      // if (team)
      // {
      //   this.authService.addTeam.emit(team);
      // }
      this.board = board;
      return board;
    }));
  }

  public createBoard (newBoard: NewBoard):Observable<Board>
  {
    return this.http.post<Board>(this.baseUrl + 'api/board/create', newBoard, {headers: this.header});
  }
}
