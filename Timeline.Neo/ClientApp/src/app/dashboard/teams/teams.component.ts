import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {WarehouseService} from "../../_services/warehouse.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor(public auth: AuthService, public warehouse: WarehouseService) {
    // this.auth.addTeam.subscribe(team =>
    // {
    //   console.log('pushing team', team);
    //   this.Teams.push(team);
    // });
    //
    // this.auth.removeTeam.subscribe(team =>
    // {
    //   console.log('leaving team', team);
    //   this.Teams = this.Teams.filter(x => x.id != team.id);
    // });
  }

  ngOnInit(): void {
    console.log('started teams component', this.auth.User);
  }

}
