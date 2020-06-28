import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {JobService} from "../_services/job.service";
import {SocketService} from "../_services/socket.service";
import {WarehouseService} from "../_services/warehouse.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{

  constructor (public auth: AuthService, public warehouse: WarehouseService)
  {
  }

  ngOnInit ()
  {
    this.warehouse.CurrentTeamId = null;
    // this.auth.IsLoggedInAsync().subscribe(loggedIn =>
    // {
    //   if (loggedIn)
    //   {
    //     // this.auth.getTeams().subscribe(user =>
    //     // {
    //     //   console.log("User with teams", this.auth.User);
    //     // });
    //
    //     // this.auth.getColleagues().subscribe(colleagues => {
    //     //   console.log('colleagues',colleagues);
    //     // });
    //   }
    // });
  }

}
