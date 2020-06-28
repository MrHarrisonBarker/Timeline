import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../_models/job";
import {JobService} from "../../_services/job.service";
import {Router} from "@angular/router";
import {FullJobComponent} from "../full-job/full-job.component";
import {MatDialog} from "@angular/material/dialog";
import {faWarehouse} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-liner-job',
  templateUrl: './liner-job.component.html',
  styleUrls: ['./liner-job.component.css']
})
export class LinerJobComponent implements OnInit
{

  faWarehouse = faWarehouse;
  @Input() job: Job;
  @Input() trunk: number = 100;

  constructor (private jobService: JobService, private router: Router, public dialog: MatDialog)
  {
  }

  ngOnInit (): void
  {
  }

  gotToJob ()
  {
    this.jobService.getRoute(this.job.id).subscribe(route =>
    {
      this.router.navigateByUrl(`/team/${route.teamId}/board/${route.boardId}`);
    });
  }

  openJob ()
  {
    const newTeamRef = this.dialog.open(FullJobComponent, {maxWidth: '80vw', data: {job: this.job}});
  }

  isRealDate (deadline: Date)
  {
    return new Date(deadline) > new Date(0)
  }

  flagJob ()
  {
    this.jobService.updateFlag(this.job.id).subscribe(flag => {
      console.log('updated flag',flag);
      this.job.flagged = !this.job.flagged;
    });
  }
}
