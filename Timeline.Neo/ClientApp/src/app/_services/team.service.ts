import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Team} from "../_models/team";
import {WarehouseService} from "./warehouse.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService
{

  public sideNavOpened: boolean = true;
  private teamObservable: Observable<Team>;
  public team: Team;
  private readonly baseUrl: string;
  private readonly header: HttpHeaders;

  constructor (private authService: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private warehouse: WarehouseService)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }

  public getTeam (teamId: string): Observable<Team>
  {

    return this.http.get<Team>(this.baseUrl + 'api/team/GetTeam', {
      headers: this.header,
      params: new HttpParams().set('TeamId', teamId)
    }).pipe(map(team =>
    {
      let teamIndex = this.warehouse.Teams.findIndex(x => x.id == team.id);
      if (teamIndex == -1) {
        this.warehouse.Teams.push(team);
        console.log('team added to warehouse', this.warehouse.Teams);
      } else {
        this.warehouse.Teams[teamIndex] = team;
        console.log('team already in warehouse', this.warehouse.Teams);
      }
      return team;
    }));
  }

  // public getTeam (teamId: string): Observable<Team>
  // {
  //   this.teamObservable = this.http.get<Team>(this.baseUrl + 'api/teams/GetTeam', {
  //     headers: this.header,
  //     params: new HttpParams().set('TeamId', teamId)
  //   }).pipe(map(team =>
  //   {
  //     console.log('pipe team', team);
  //     this.team = team;
  //     return team;
  //   }));
  //
  //   return this.TeamAsync();
  // }

  public newTeam (team: Team)
  {
    console.log('creating team', team);
    return this.http.post<Team>(this.baseUrl + 'api/team/create', {
      team: team,
      userId: this.authService.User.id
    }, {headers: this.header}).pipe(map(team =>
    {
      if (team)
      {
        this.warehouse.Teams.push(team);
        this.authService.User.employments.push(team);
        console.log('team created', team);
        return team;
      }
    }));
  }

  // public TeamAsync (): Observable<Team>
  // {
  //   return this.teamObservable;
  // }
  //
  // public getInviteToken (): Observable<string>
  // {
  //   return this.http.get<string>(this.baseUrl + 'api/teams/token/' + this.team.id, {headers: this.header});
  // }

  public joinTeam (inviteToken: string): Observable<Team>
  {
    let newTeam = {
      userId: this.authService.User.id,
      inviteToken: inviteToken
    };

    return this.http.post<Team>(this.baseUrl + 'api/team/join', newTeam, {headers: this.header}).pipe(map(team =>
    {
      if (team)
      {
        console.log('Joined Team', team);
        this.team = team;
      }
      return team;
    }));
  }

  public leaveTeam (teamId: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.baseUrl + 'api/team/leaveteam', {
      userId: this.authService.User.id,
      teamId: teamId
    }, {headers: this.header}).pipe(map(left =>
    {
      return left;
    }));
  }
}
