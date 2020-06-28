import {Component, OnInit} from '@angular/core';
import {WarehouseService} from "../../_services/warehouse.service";
import {Job, JobPriority, JobStatus, JobType} from "../../_models/job";
import {Board} from "../../_models/board";
import {JobService, NewJob} from "../../_services/job.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../_services/auth.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardService} from "../../_services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {NewBacklogBoardComponent} from "../../backlog/new-backlog-board/new-backlog-board.component";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit
{
  faPlus = faPlus;
  newBoard: Board;
  clicked: boolean;
  backLogJobs: Job[];

  constructor (public warehouse: WarehouseService, public jobService: JobService, private auth: AuthService, private boardService: BoardService, public dialog: MatDialog)
  {
    this.newBoard = {
      name: `${this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].name} - ${Math.floor(Math.random() * 10000)}`,
      jobs: [],
    }
  }

  ngOnInit (): void
  {
    this.backLogJobs = this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].jobs.filter(job => job.team.id == this.warehouse.CurrentTeamId && !job.archived && job.board == null)
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

  drop (event: CdkDragDrop<Job[]>)
  {
    console.log(event);
    if (event.previousContainer === event.container)
    {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else
    {
      // if (event.container.id == 'newBoardList') {
      //   event.previousContainer.data.find(x => x.id)
      // }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  createBoard ()
  {
    const dialog = this.dialog.open(NewBacklogBoardComponent, {
      data: this.newBoard
    });
  }

  // createJobNewBoard (name: string, type: string, priority: string)
  // {
  //   let newJob: NewJob = {
  //     job: {
  //       name: name,
  //       jobType: JobType[type],
  //       priority: JobPriority[priority],
  //       jobStatus: JobStatus.ToDo,
  //       startDate: new Date(),
  //       description: null,
  //       finished: false,
  //       archived: false
  //     },
  //     users: [this.auth.User]
  //   };
  //
  //   this.newBoard.jobs.push(newJob);
  // }
  boardTitleClicked: boolean;

  randomJob ()
  {
    let today: Date = new Date();
    let newJob: NewJob = {
      job: {
        name: `Job - ${Math.floor(Math.random() * 10000) + 1000}`,
        jobType: Math.floor(Math.random() * 2),
        priority: Math.floor(Math.random() * 3),
        jobStatus: JobStatus.ToDo,
        startDate: this.getRandomDate(new Date(today.getUTCFullYear() - 1, today.getUTCMonth(), 1),today),
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
        this.clicked = false;
      }
    });
  }

  getRandomDate (from, to)
  {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
  }
}
