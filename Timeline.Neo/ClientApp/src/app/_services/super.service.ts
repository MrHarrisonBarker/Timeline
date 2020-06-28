import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Team} from "../_models/team";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class SuperService
{

  private readonly baseUrl: string;
  private readonly header: HttpHeaders;

  constructor (private authService: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }


  public getTeams (): Observable<Team[]>
  {
    return this.http.get<Team[]>(this.baseUrl + 'api/teams', {headers: this.header})
  }

  public getUsers (): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl + 'api/user', {headers: this.header})
  }

}
