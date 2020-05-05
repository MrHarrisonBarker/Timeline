import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {Deadline, Job} from "../../_models/job";

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.css']
})
export class DeadlineComponent implements OnInit
{

  filteredJobs: Job[];
  deadlines: Deadline[] = [];

  constructor (public teamService: TeamService)
  {
  }

  ngOnInit (): void
  {
    this.filterJobs();
  }

  filterJobs ()
  {
    this.filteredJobs = this.teamService.team.Associations.filter(x => !x.archived);
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
