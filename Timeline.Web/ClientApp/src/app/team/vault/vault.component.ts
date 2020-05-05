import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {Job} from "../../_models/job";
import {FullJobComponent} from "../../job/full-job/full-job.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit
{

  public archivedJobs: Job[] = [];
  bsModalRef: BsModalRef;

  constructor (public teamService: TeamService, private modalService: BsModalService)
  {
  }

  ngOnInit (): void
  {
    this.archivedJobs = this.teamService.team.Associations.filter(x => x.archived);
  }

  openFullJob (job: Job)
  {
    const initialState = {
      Job: job
    };
    this.bsModalRef = this.modalService.show(FullJobComponent, {initialState, class: "modal-lg"});
  }
}
