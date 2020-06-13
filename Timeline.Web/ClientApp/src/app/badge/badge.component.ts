import {Component, Input, OnInit} from '@angular/core';
import {Job, JobPriority, JobStatus, JobType} from "../_models/job";
import {DEFCON} from "../_services/job.service";

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit
{
  @Input() status: JobStatus = null;
  @Input() type: JobType = null;
  @Input() priority: JobPriority = null;

  background: string;
  @Input()text: string;

  constructor ()
  {
  }

  ngOnInit (): void
  {
	// console.log(this.status,this.type,this.priority);
    if (this.status != null)
    {
      this.background = this.getStatusBackGround(this.status);
      this.text = JobStatus[this.status];
    } else if (this.type != null)
    {
      this.background = this.getTypeBackGround(this.type);
      this.text = JobType[this.type];
    } else if (this.priority != null)
    {
      this.background = this.getPriorityBackGround(this.priority);
      this.text = JobPriority[this.priority];
    }
  }

  public getStatusBackGround (jobStatus: JobStatus): string
  {
    switch (jobStatus)
    {
      // case JobStatus.Backlog:
      // {
      //   return "#f44336";
      // }
      case JobStatus.ToDo:
      {
        return "Blue";
      }
      case JobStatus.Completed:
      {
        return "#4caf50";
      }
      case JobStatus.InProgress:
      {
        return "brown";
      }
      case JobStatus.Verify:
      {
        return "orange"
      }
    }
  }

  public getPriorityBackGround (jobPriority: JobPriority): DEFCON
  {
    switch (jobPriority)
    {
      case JobPriority.DEFCON5:
        return DEFCON.DEFCON5;
      case JobPriority.DEFCON4:
        return DEFCON.DEFCON4;
      case JobPriority.DEFCON3:
        return DEFCON.DEFCON3;
      case JobPriority.DEFCON2:
        return DEFCON.DEFCON2;
      case JobPriority.DEFCON1:
        return DEFCON.DEFCON1;
    }
  }

  public getTypeBackGround (jobType: JobType): string
  {
    switch (jobType)
    {
      case JobType.Bug :
      {
        return "limegreen"
      }
      case JobType.Feature :
      {
        return "purple"
      }
      case JobType.Generic :
      {
        return "grey"
      }
    }
  }

}
