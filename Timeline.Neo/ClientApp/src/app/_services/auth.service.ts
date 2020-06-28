import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {User, Authenticate} from "../_models/user";
import {Team} from "../_models/team";
import {SocketService} from "./socket.service";
import {WarehouseService} from "./warehouse.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private isLoggedInObservable: Observable<boolean> = of(false);
  private userObservable: Observable<User>;
  private readonly baseUrl;
  private header: HttpHeaders;
  public token: string;

  public User: User = null;
  public Colleagues: User[];


  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private socketService: SocketService, private warehouse: WarehouseService)
  {
    this.baseUrl = baseUrl;
  }

  public AllReadyLogged (): Observable<User>
  {
    this.token = localStorage.getItem('token');
    let email = localStorage.getItem('email');
    console.log('user token and email from storage', this.token, email);
    if (this.token && email)
    {
      this.header = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
      this.userObservable = this.http.post<User>(this.baseUrl + 'api/user/lilAuth', {email: email}, {headers: this.header}).pipe(map(user =>
      {
        if (user)
        {
          console.log('got user using local storage', user);
          this.User = user;
          this.warehouse.Teams = user.employments;
          this.warehouse.Jobs = user.assignments;
        }

        this.isLoggedInObservable = of(user != null);

        return user;
      }));

      this.userObservable.subscribe(loggedIn =>
      {
        console.log('logged in', loggedIn);
      })
    }

    return this.userObservable;
  }

  public AuthenticateUser (auth: Authenticate): Observable<User>
  {
    console.log("Authenticating");
    if (this.User == null)
    {
      this.userObservable = this.http.post<User>(this.baseUrl + 'api/user/authenticate', auth).pipe(map(user =>
      {

        if (user)
        {
          console.log('got user', user);
          this.User = user;
          localStorage.setItem('token', this.User.token);
          localStorage.setItem('email', this.User.email);
          console.log(localStorage);
          this.header = new HttpHeaders({'Authorization': `Bearer ${this.User.token}`});
          this.warehouse.Teams = user.employments;
          this.warehouse.Jobs = user.assignments;
          console.log('initial warehouse', this.warehouse);
        }

        this.isLoggedInObservable = of(user != null);

        return user;
      }));
    }

    return this.userObservable;
  }

  public IsLoggedInAsync (): Observable<boolean>
  {
    return this.isLoggedInObservable;
  }

  // public getTeams (): Observable<Team[]>
  // {
  //   return this.http.get<Team[]>(this.baseUrl + 'api/user/team', {
  //     headers: this.header,
  //     params: new HttpParams().set('UserId', this.User.id)
  //   }).pipe(map(teams =>
  //   {
  //     this.warehouse.Teams = teams;
  //     return teams;
  //   }));
  // }

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
    }).pipe(map(colleagues =>
    {
      this.Colleagues = colleagues;
      return colleagues;
    }));
  }

  createUser (user: User): Observable<User>
  {
    return this.http.post<User>(this.baseUrl + 'api/user/create', user);
  }
}
