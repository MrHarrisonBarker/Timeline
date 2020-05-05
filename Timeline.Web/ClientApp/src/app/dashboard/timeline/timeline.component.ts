import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Deadline, Job} from "../../_models/job";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  private filteredJobs: Job[];
  public deadlines: Deadline[] = [];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getJobs().subscribe(user => {
      console.log('getting jobs from timeline');
      this.auth.User.Associations = user.Associations;
      this.filterJobs();
    });
  }

  filterJobs ()
  {
    this.filteredJobs = this.auth.User.Associations.filter(x => !x.archived);
    this.filteredJobs.forEach(job =>
    {
      var index = this.deadlines.findIndex(x => x.Deadline == job.deadline);
      if (index == -1) {
        this.deadlines.push({Deadline: job.deadline, Jobs: [job]});
      } else {
        this.deadlines[index].Jobs.push(job);
      }
    });
    console.log('deadlines', this.deadlines);
  }

}
