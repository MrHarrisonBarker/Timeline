import {Component, Input, OnInit} from '@angular/core';
import {Job, JobPriority, JobStatus, JobType} from "../../_models/job";
import {JobService, NewJob} from "../../_services/job.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {WarehouseService} from "../../_services/warehouse.service";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit
{

  @Input() Jobs: Job[];
  faPlus = faPlus;
  clicked: boolean;
  name: HTMLInputElement;
  @Input()quick: boolean = true;

  constructor (private jobService: JobService, private warehouse: WarehouseService, private auth: AuthService)
  {
  }

  ngOnInit (): void
  {
  }

  createJob (name: string, type: number, priority: number)
  {
    let newJob: NewJob = {
      job: {
        name: name,
        jobType: type,
        priority: priority,
        jobStatus: JobStatus.ToDo,
        startDate: new Date(),
        description: null,
        finished: false,
        archived: false
      },
      users: [this.auth.User]
    };

    this.jobService.newBoardlessJob(newJob, this.warehouse.CurrentTeamId).subscribe(job =>
    {
      if (job)
      {
        console.log('create new boardless job', job);
        this.clicked = false;
      }
    });
  }
}
