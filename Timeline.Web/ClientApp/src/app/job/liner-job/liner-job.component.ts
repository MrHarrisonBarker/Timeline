import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../_models/job";
import {JobService} from "../../_services/job.service";
import {Router} from "@angular/router";
import {FullJobComponent} from "../full-job/full-job.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-liner-job',
  templateUrl: './liner-job.component.html',
  styleUrls: ['./liner-job.component.css']
})
export class LinerJobComponent implements OnInit
{

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
    this.jobService.getRoute(this.job.jobId).subscribe(route =>
    {
      this.router.navigateByUrl(`/team/${route.teamId}/board/${route.boardId}`);
    });
  }

  openJob ()
  {
    // const initialState = {
    //   Job: this.job
    // };
    // this.bsModalRef = this.modalService.show(FullJobComponent, {initialState, class: "modal-lg"});
    const newTeamRef = this.dialog.open(FullJobComponent, {maxWidth: '80vw', width: '100%', data: {job: this.job}});
  }

  isRealDate (deadline: Date)
  {
    return new Date(deadline) > new Date(0)
  }
}
