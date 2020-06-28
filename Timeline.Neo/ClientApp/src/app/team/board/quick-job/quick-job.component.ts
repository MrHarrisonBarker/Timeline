import {Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {JobService, NewJob} from "../../../_services/job.service";
import {JobStatus} from "../../../_models/job";
import {AuthService} from "../../../_services/auth.service";
import {WarehouseService} from "../../../_services/warehouse.service";

@Component({
  selector: 'app-quick-job',
  templateUrl: './quick-job.component.html',
  styleUrls: ['./quick-job.component.css']
})
export class QuickJobComponent implements OnInit
{
  faPlus = faPlus;
  clicked: boolean = false;

  @Input() status: JobStatus;
  @Input() boardId: string;

  constructor (private jobService: JobService, private auth: AuthService, private warehouse: WarehouseService)
  {
  }

  ngOnInit (): void
  {
  }

  createJob (name: string, type: any, priority: any)
  {
    let indexes = this.warehouse.GetTeamBoardIndex(this.warehouse.CurrentTeamId,this.boardId);
    let newJob: NewJob = {
      job: {
        name: name,
        jobType: type,
        priority: priority,
        jobStatus: this.status,
        startDate: new Date(),
        deadline: new Date(this.warehouse.Teams[indexes.team].boards[indexes.board].endDate),
        description: null,
        finished: false,
        archived: false
      },
      users: [this.auth.User]
    };

    this.jobService.newJob(newJob, this.warehouse.CurrentTeamId,this.boardId).subscribe(job =>
    {
      if (job)
      {
        this.clicked = false;
      }
    });
  }

  @HostListener('document:click', ['$event.target'])
  public onClick (targetElement)
  {
    this.clicked = targetElement.classList.contains('clickHide'+this.status);
  }
}
