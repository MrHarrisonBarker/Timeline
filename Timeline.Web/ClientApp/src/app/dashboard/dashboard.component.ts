import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {JobService} from "../_services/job.service";
import {SocketService} from "../_services/socket.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
  private show: string = 'Timeline';
  public currentTeamId: string;

  constructor (public auth: AuthService, private jobService: JobService, private router: Router, public socketService: SocketService)
  {
    this.auth.removeTeam.subscribe(team =>
    {
      console.log('emit received for removing team on dashboard');
    });

    this.auth.showDash.subscribe(show =>
    {
      this.show = show;
    });

    this.auth.currentTeam.subscribe(currentTeam => {
      this.currentTeamId = currentTeam;
    });

  }

  ngOnInit ()
  {
    this.auth.IsLoggedInAsync().subscribe(loggedIn =>
    {
      if (loggedIn)
      {
        this.auth.getTeams().subscribe(user =>
        {
          console.log("User with teams", this.auth.User);
        });

        this.auth.getColleagues().subscribe(colleagues => {
          console.log('colleagues',colleagues);
        });
      }
    })
  }

}
