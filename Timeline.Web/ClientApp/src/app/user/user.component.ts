import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {JobService} from "../_services/job.service";
import {Job} from "../_models/job";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public auth: AuthService, private jobService: JobService, private router: Router) { }

  ngOnInit() {
    this.auth.IsLoggedInAsync().subscribe(loggedIn => {
      // console.log("USer",user);
      if (loggedIn) {
        this.auth.getTeams().subscribe(user => {
          console.log("User with teams", this.auth.User);
        });

        this.auth.getJobs().subscribe();
      }
    });
  }

  public newJob(name: string, description: string, teamId: string) {
    let job: Job = {
      name: name,
      description: description,
      archived: false,
      finished: false,
      startDate: new Date()
    };
    // this.jobService.newJob(job,teamId).subscribe(data => {
    //   console.log("New Job complete",data);
    // });
  }

  public removeJob(jobId: string) {
    this.jobService.removeJob(jobId).subscribe(() => {
      console.log("Removed job", jobId);
    });
  }

  public goToTeam(id: string) {
    this.router.navigateByUrl(`/team/${id}`)
  }
}
