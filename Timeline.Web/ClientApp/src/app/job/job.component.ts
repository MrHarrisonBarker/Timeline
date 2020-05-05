import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FullJobComponent} from "./full-job/full-job.component";
import {TeamService} from "../_services/team.service";
import {Job} from "../_models/job";
import {JobService} from "../_services/job.service";


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit
{

  @Input() Job: Job;
  bsModalRef: BsModalRef;

  constructor (private jobService: JobService, private modalService: BsModalService, private teamService: TeamService)
  {
  }

  ngOnInit ()
  {
    if(this.teamService.team)
    {
      // @ts-ignore
      this.Job.AssociatedUsers = this.teamService.team.Affiliations.filter(x => this.Job.AssociatedUsers.includes(x.id));
      console.log("Job associated to users ", this.Job.AssociatedUsers, this.Job);
    }
  }


  public removeJob ()
  {
    this.jobService.removeJob(this.Job.jobId).subscribe(() =>
    {
      console.log("Removed job", this.Job.jobId);
    });
  }


  OpenFullJob ()
  {
    console.log('open full job');
    const initialState = {
      Job: this.Job
    };
    this.bsModalRef = this.modalService.show(FullJobComponent, {initialState, class: "modal-lg"});
  }

  DeleteJob ()
  {

  }

  ArchiveJob ()
  {

  }
}
