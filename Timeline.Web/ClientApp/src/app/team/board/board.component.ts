import {Component, Input, OnInit} from '@angular/core';
import {Job, JobPriority, JobType} from "../../_models/job";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {NewJobComponent} from "../new-job/new-job.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {JobService} from "../../_services/job.service";
import {TeamService} from "../../_services/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Board} from "../../_models/board";
import {BoardService} from "../../_services/board.service";

export enum boardMode
{
  regular,
  compact
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit
{

  // @Input() Team: Team;
  TeamId: string;
  Board: Board;
  Jobs: Job[][] = [[], [], [], []];
  public currentMode: boardMode = boardMode.regular;

  public progressBarTypeComp: any[][] = [[], [], [], []];
  public progressBarPriorityComp: any[][] = [[], [], [], []];
  private newJobRef: BsModalRef;

  constructor (public jobService: JobService, public teamService: TeamService, private modalService: BsModalService, private route: ActivatedRoute, private boardService: BoardService)
  {
    this.jobService.addEvent.subscribe(jobs =>
    {
      console.log('Added job', jobs);
      this.Board.Jobs.push(jobs);
      this.filterJobs();
    });
  }

  ngOnInit (): void
  {
    this.TeamId = this.route.snapshot.paramMap.get('id');
    let boardId = this.route.snapshot.paramMap.get('boardId');

    this.boardService.getBoard(boardId).subscribe(board =>
    {
      this.Board = board;
      this.filterJobs();
    });

  }

  private filterJobs (): void
  {
    this.Jobs = [[], [], [], []];

    this.Board.Jobs.filter(x => !x.archived).forEach(job =>
    {
      this.Jobs[job.jobStatus].push(job);
    });

    this.progressBarTypeComp = [[], [], [], []];

    for (let i = 0; i < 4; i++)
    {
      if (this.Jobs[i].length > 0)
      {
        this.CreateTypeProgressBar(i);
        this.CreatePriorityProgressBar(i);
      }
    }

    console.log("Progress bar", this.progressBarTypeComp);
    console.log("Jobs", this.Jobs);
  }

  private CreatePriorityProgressBar (index: number): void
  {
    this.progressBarPriorityComp[index] = [];
    let DEFCON1 = 0, DEFCON2 = 0, DEFCON3 = 0, DEFCON4 = 0, DEFCON5 = 0;
    this.Jobs[index].forEach(job =>
    {
      switch (job.priority)
      {
        case JobPriority.DEFCON1:
          DEFCON1++;
          return;
        case JobPriority.DEFCON2:
          DEFCON2++;
          return;
        case JobPriority.DEFCON3:
          DEFCON3++;
          return;
        case JobPriority.DEFCON4:
          DEFCON4++;
          return;
        case JobPriority.DEFCON5:
          DEFCON5++;
          return;
      }
    });

    this.progressBarPriorityComp[index].push({
      value: Math.round(DEFCON1 / this.Jobs[index].length * 100),
      type: 'DEFCON1',
      label: 'DEFCON1'
    });

    this.progressBarPriorityComp[index].push({
      value: Math.round(DEFCON2 / this.Jobs[index].length * 100),
      type: 'DEFCON2',
      label: 'DEFCON2'
    });

    this.progressBarPriorityComp[index].push({
      value: Math.round(DEFCON3 / this.Jobs[index].length * 100),
      type: 'DEFCON3',
      label: 'DEFCON3'
    });

    this.progressBarPriorityComp[index].push({
      value: Math.round(DEFCON4 / this.Jobs[index].length * 100),
      type: 'DEFCON4',
      label: 'DEFCON4'
    });

    this.progressBarPriorityComp[index].push({
      value: Math.round(DEFCON5 / this.Jobs[index].length * 100),
      type: 'DEFCON5',
      label: 'DEFCON5'
    });
  }

  private CreateTypeProgressBar (index: number): void
  {
    this.progressBarTypeComp[index] = [];
    let numOfBugs = 0;
    let numOfFeatures = 0;
    let numOfGenerics = 0;
    this.Jobs[index].forEach(job =>
    {
      if (job.jobType == JobType.Bug)
      {
        numOfBugs++
      } else if (job.jobType == JobType.Feature)
      {
        numOfFeatures++
      } else if (job.jobType == JobType.Generic)
      {
        numOfGenerics++
      }
    });

    this.progressBarTypeComp[index].push({
      value: Math.round(numOfBugs / this.Jobs[index].length * 100),
      type: 'bug',
      label: 'Bugs'
    });

    this.progressBarTypeComp[index].push({
      value: Math.round(numOfFeatures / this.Jobs[index].length * 100),
      type: 'feature',
      label: 'Features'
    });

    this.progressBarTypeComp[index].push({
      value: Math.round(numOfGenerics / this.Jobs[index].length * 100),
      type: 'generic',
      label: 'Generic'
    });
  }


  private getListIndex (id: string): number
  {
    switch (id)
    {
      case 'cdk-drop-list-0':
        return 0;
      case 'cdk-drop-list-1':
        return 1;
      case 'cdk-drop-list-2':
        return 2;
      case 'cdk-drop-list-3':
        return 3;
    }
  }

  public drop (event: CdkDragDrop<Job>, index: number): void
  {
    console.log(event);
    if (event.previousContainer === event.container)
    {
      moveItemInArray(this.Jobs[index], event.previousIndex, event.currentIndex);
    } else
    {

      let prevIndex = this.getListIndex(event.previousContainer.id);

      console.log('prev index', prevIndex, 'new index', index);

      transferArrayItem(this.Jobs[prevIndex], this.Jobs[index], event.previousIndex, event.currentIndex);

      this.changeJobStatus(index, event.currentIndex);

      this.CreateTypeProgressBar(index);
      this.CreateTypeProgressBar(prevIndex);

      this.CreatePriorityProgressBar(index);
      this.CreatePriorityProgressBar(prevIndex);

    }
  }

  private changeJobStatus (statusIndex: number, jobIndex: number): void
  {
    this.Jobs[statusIndex][jobIndex].jobStatus = statusIndex;
    this.jobService.changeStatus(this.Jobs[statusIndex][jobIndex].jobId, statusIndex).subscribe(() =>
    {
      console.log('Changed status')
    });
  }

  public newJob (jobStatus: number): void
  {
    const initialState = {
      TeamId: this.TeamId,
      Board: this.Board,
      InitialStatus: jobStatus
    };

    this.newJobRef = this.modalService.show(NewJobComponent, {initialState, class: "modal-lg"});
    this.newJobRef.content.closeBtnName = 'Close';
  }

  leave ()
  {
    this.teamService.leaveTeam(this.TeamId).subscribe(left =>
    {
      if (left)
      {
        console.log('left');
      }
    });
  }

  filterByStatus (number: number)
  {

  }

  filterByType (type: number)
  {
    this.Jobs = [[], [], [], []];
    this.Board.Jobs.filter(x => !x.archived).forEach(job =>
    {
      if (job.jobType == type)
      {
        this.Jobs[job.jobStatus].push(job);
      }
    });
  }

  filterByPriority (priority: number)
  {
    this.Jobs = [[], [], [], []];
    this.Board.Jobs.filter(x => !x.archived).forEach(job =>
    {
      if (job.priority == priority)
      {
        this.Jobs[job.jobStatus].push(job);
      }
    });
  }

  resetFilter ()
  {
    this.filterJobs();
  }

  toggleMode ()
  {
    if (this.currentMode == boardMode.regular) {
      this.currentMode = boardMode.compact;
    } else {
      this.currentMode = boardMode.regular;
    }
  }
}
