import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../_models/job";
import {JobService} from "../../_services/job.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit
{

  @Input()Jobs: Job[];

  constructor (private jobService: JobService)
  {
  }

  ngOnInit (): void
  {
  }

}
