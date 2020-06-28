import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FullJobComponent} from "./full-job/full-job.component";
import {Job} from "../_models/job";
import {JobService} from "../_services/job.service";
import {BoardService} from "../_services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../_models/user";
import {WarehouseService} from "../_services/warehouse.service";


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit
{

  @Input() Job: Job;
  bsModalRef: BsModalRef;
  nullDate: Date = new Date(null);

  constructor (private jobService: JobService, public dialog: MatDialog, private boardService: BoardService, private warehouse: WarehouseService)
  {
  }

  ngOnInit ()
  {
    // console.log('null date',this.nullDate);
    if(this.boardService.board)
    {
      // @ts-ignore
      this.Job.AssociatedUsers = this.boardService.board.BoardMembers.filter(x => this.Job.AssociatedUsers.includes(x.id));
      // console.log("Job associated to users ", this.Job.AssociatedUsers, this.Job);
    }
  }


  public removeJob ()
  {
    this.jobService.removeJob(this.Job).subscribe(() =>
    {
      console.log("Removed job", this.Job.id);
    });
  }


  OpenFullJob ()
  {
    // console.log('open full job');
    // const initialState = {
    //   Job: this.Job
    // };
    // this.bsModalRef = this.modalService.show(FullJobComponent, {initialState, class: "modal-lg"});
    const newTeamRef = this.dialog.open(FullJobComponent, {maxWidth: '80vw', width: '100%', data: {job: this.Job}});
  }

  DeleteJob ()
  {

  }

  ArchiveJob ()
  {

  }

  printDeadline (deadline: Date)
  {
    console.log('deadline', deadline);
  }

  getUserFromWarehouse (id: string): User
  {
    return this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].employments.find(x => x.id == id);
  }
}
