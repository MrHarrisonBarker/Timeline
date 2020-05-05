import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Audit} from "../_models/audit";

@Injectable({
  providedIn: 'root'
})
export class AuditService
{

  private readonly baseUrl: string;
  private readonly header: HttpHeaders;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }

  public GetAll (): Observable<Audit[]>
  {
    return this.http.get<Audit[]>(this.baseUrl + 'api/audit/getaudits',{headers: this.header});
  }
}
