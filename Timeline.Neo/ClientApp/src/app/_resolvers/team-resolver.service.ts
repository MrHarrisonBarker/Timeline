import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {empty, Observable} from "rxjs";
import {TeamService} from "../_services/team.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TeamResolverService implements Resolve<any> {

  constructor(private teamService: TeamService) { }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return this.teamService.getTeam(route.paramMap.get('teamId')).pipe(catchError(err => {
      console.log('team resolver found error', err);
      return empty();
    }))
  }
}
