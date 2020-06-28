import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Board} from "../../_models/board";
import {BoardService} from "../../_services/board.service";
import {WarehouseService} from "../../_services/warehouse.service";
import {AuthService} from "../../_services/auth.service";
import {Job} from "../../_models/job";
import {MatDatepicker} from "@angular/material/datepicker";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-backlog-board',
  templateUrl: './new-backlog-board.component.html',
  styleUrls: ['./new-backlog-board.component.css']
})
export class NewBacklogBoardComponent implements OnInit
{

  public now: Date;
  selected = 2;
  // startDate = new FormControl();
  // endDate = new FormControl();
  startDate: Date = new Date();
  endDate: Date;
  isPermanent: boolean = false;

  constructor (private router: Router, private dialogRef: MatDialogRef<NewBacklogBoardComponent>, @Inject(MAT_DIALOG_DATA) public data: Board, private boardService: BoardService, private warehouse: WarehouseService, private auth: AuthService)
  {
    this.now = new Date(Date.now());
  }

  ngOnInit (): void
  {
    this.getDate()
  }

  createBoard (picker: string)
  {
    console.log(this.startDate, this.endDate);
    this.data.accent = picker;
    let jobs: Job[] = [];
    this.data.jobs.forEach(job =>
    {
      jobs.push({
        id: job.id
      });
    });
    this.data.startDate = this.startDate;
    this.data.endDate = new Date(null);
    this.data.permanent = this.isPermanent;
    this.data.jobs = jobs;
    this.boardService.createBoard({
      board: this.data,
      teamId: this.warehouse.CurrentTeamId,
      userId: this.auth.User.id
    }).subscribe(board =>
    {
      if (board)
      {
        console.log('created board', board);
        this.dialogRef.close();
        this.router.navigateByUrl(`team/${this.warehouse.CurrentTeamId}`);
      }
    });
  }

  getDate ()
  {
    // console.log('selected');
    if (this.selected != 5)
    {
      this.endDate = new Date(Date.now() + (6.048e+8 * this.selected));
    } else
    {
      this.endDate = new Date(Date.now() + (6.048e+8 * 2));
    }
  }

  durationChange ()
  {
    console.log('duration change');
  }
}
