import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Team} from "../_models/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService
{

  private teamObservable: Observable<Team>;
  public team: Team;
  private readonly baseUrl: string;
  private readonly header: HttpHeaders;

  constructor (private authService: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }

  public getTeam (teamId: string): Observable<Team>
  {
    this.teamObservable = this.http.get<Team>(this.baseUrl + 'api/teams/GetTeam', {
      headers: this.header,
      params: new HttpParams().set('TeamId', teamId)
    }).pipe(map(team =>
    {
      console.log('pipe team', team);
      this.team = team;
      return team;
    }));

    return this.TeamAsync();
  }

  public newTeam (team: Team)
  {
    console.log('creating team', team);
    return this.http.post<Team>(this.baseUrl + 'api/teams/create', {
      team: team,
      userId: this.authService.User.id
    }, {headers: this.header}).pipe(map(team =>
    {
      if (team)
      {
        console.log('team created', team);
        this.authService.addTeam.emit(team);
        return team;
      }
    }));
  }

  public TeamAsync (): Observable<Team>
  {
    return this.teamObservable;
  }

  public getInviteToken (): Observable<string>
  {
    return this.http.get<string>(this.baseUrl + 'api/teams/token/' + this.team.id, {headers: this.header});
  }

  public joinTeam (inviteToken: string): Observable<Team>
  {
    let newTeam = {
      userId: this.authService.User.id,
      inviteToken: inviteToken
    };

    return this.http.post<Team>(this.baseUrl + 'api/teams/jointeam', newTeam, {headers: this.header}).pipe(map(team =>
    {
      if (team)
      {
        console.log('Joined Team', team);
        this.team = team;
        this.authService.addTeam.emit(team);
      }
      return team;
    }));
  }

  public leaveTeam (teamId: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.baseUrl + 'api/teams/leaveteam', {
      userId: this.authService.User.id,
      teamId: teamId
    }, {headers: this.header}).pipe(map(left =>
    {
      this.authService.removeTeam.emit(this.team);
      return left;
    }));
  }
}
