import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Deadline, Job} from "../../_models/job";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit
{

  public flaggedJobs: Job[] = [];
  public overDeadlineJobs: Job[] = [];
  public deadlines: Deadline[] = [];

  constructor (public auth: AuthService)
  {
  }

  ngOnInit ()
  {
    this.auth.getJobs().subscribe(user =>
    {
      console.log('getting jobs from timeline');
      this.auth.User.Associations = user.Associations;
      this.filterFlagged();
      this.filterOverDeadline();
    });
  }

  private filterFlagged ()
  {
    this.flaggedJobs = this.auth.User.Associations.filter(x => x.flagged);
  }

  private filterOverDeadline ()
  {
    let now = new Date();
    console.log(now);
    this.overDeadlineJobs = this.auth.User.Associations.filter(x => new Date(x.deadline) < now && new Date(x.deadline) > new Date(null));
  }

  // filterJobs ()
  // {
  //   this.filteredJobs = this.auth.User.Associations.filter(x => !x.archived);
  //   this.filteredJobs.forEach(job =>
  //   {
  //     var index = this.deadlines.findIndex(x => x.Deadline == job.deadline);
  //     if (index == -1)
  //     {
  //       this.deadlines.push({Deadline: job.deadline, Jobs: [job]});
  //     } else
  //     {
  //       this.deadlines[index].Jobs.push(job);
  //     }
  //   });
  //   console.log('deadlines', this.deadlines);
  // }

  log (event: MatTabChangeEvent)
  {
    // console.log($event);
    if (event.index == 1)
    {
      this.filterFlagged();
    } else if (event.index == 2)
    {
      this.filterOverDeadline();
    }
  }
}
