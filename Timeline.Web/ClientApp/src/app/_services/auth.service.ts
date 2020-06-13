import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {User, Authenticate} from "../_models/user";
import {Team} from "../_models/team";
import {SocketService} from "./socket.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private isLoggedInObservable: Observable<boolean> = of(false);
  private readonly baseUrl;
  private header: HttpHeaders;

  public User: User;
  public Colleagues: User[];
  public currentTeam: EventEmitter<string> = new EventEmitter<string>();
  public toggleTimeline: EventEmitter<boolean> = new EventEmitter<boolean>();
  public addTeam: EventEmitter<Team> = new EventEmitter<Team>();
  public removeTeam: EventEmitter<Team> = new EventEmitter<Team>();
  public toggleConfigBar: EventEmitter<any> = new EventEmitter<any>();
  public CurrentTeam: string;
  public showConfig: EventEmitter<string> = new EventEmitter<string>();
  public showDash: EventEmitter<string> = new EventEmitter<string>();


  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private socketService: SocketService)
  {
    this.baseUrl = baseUrl;
  }

  public AuthenticateUser (auth: Authenticate): Observable<boolean>
  {
    console.log("Authenticating");
    this.isLoggedInObservable = this.http.post<User>(this.baseUrl + 'api/user/authenticate', auth).pipe(map(user =>
    {
      console.log(user);
      if (user)
      {
        this.User = user;
        this.header = new HttpHeaders({'Authorization': `Bearer ${this.User.token}`})
      }
      this.socketService.createConnection().then(() =>
      {
        this.socketService.connection.invoke("add", this.User.id);
      });
      return user != null;
    }));

    return this.IsLoggedInAsync();
  }

  public IsLoggedInAsync (): Observable<boolean>
  {
    return this.isLoggedInObservable;
  }

  public getTeams (): Observable<User>
  {
    return this.http.get<User>(this.baseUrl + 'api/user/teams', {
      headers: this.header,
      params: new HttpParams().set('UserId', this.User.id)
    }).pipe(map(user =>
    {
      console.log("Get team", user);
      this.User.Affiliations = user.Affiliations;
      console.log(this.User);
      return user;
    }));
  }

  public getJobs (): Observable<User>
  {
    return this.http.get<User>(this.baseUrl + 'api/user/jobs', {
      headers: this.header,
      params: new HttpParams().set('UserId', this.User.id)
    }).pipe(map(user =>
    {
      console.log("Get Jobs", user);
      return user;
    }))
  }

  public getColleagues (): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl + 'api/user/colleagues', {
      headers: this.header,
      params: new HttpParams().set('UserId', this.User.id)
    }).pipe(map(colleagues => {
      this.Colleagues = colleagues;
      return colleagues;
    }));
  }

  createUser (user: User): Observable<User>
  {
    return this.http.post<User>(this.baseUrl + 'api/user/create', user);
  }
}
